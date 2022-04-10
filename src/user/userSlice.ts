import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserLogin = createAsyncThunk(
  "user/fetchUserLogin",
  async (userName: string) => {
    const res = new Promise((resolve, reject) => {
      localStorage.setItem("userName", userName);
      resolve(userName);
    });
    return res;
  }
);

export const fetchCategoryPassed = createAsyncThunk(
  "user/fetchCategoryPassed",
  async () => {
    const res = new Promise((resolve, reject) => {
      const result = localStorage.getItem("categoryPassed");
      const categoryPassed = result?.split(",");

      resolve(categoryPassed);
    });
    return res;
  }
);

export const postCategoryPassed = createAsyncThunk(
  "user/setCategoryPassed",
  async (categoryPassed: Array<string>) => {
    const res = new Promise((resolve, reject) => {
      localStorage.setItem("categoryPassed", categoryPassed.toString());
      resolve(categoryPassed);
    });
    return res;
  }
);

export interface UserState {
  isLoading: boolean;
  user: string | null;
  error: string | null;
  categoryPassed: Array<string>;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  error: null,
  categoryPassed: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.user = action.payload;
    },
    setCategoryPassed: (state, action) => {
      state.categoryPassed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload as string;
    });
    builder.addCase(fetchUserLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(fetchCategoryPassed.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategoryPassed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categoryPassed = action.payload as Array<string>;
    });
    builder.addCase(fetchCategoryPassed.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(postCategoryPassed.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postCategoryPassed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categoryPassed = action.payload as Array<string>;
    });
    builder.addCase(postCategoryPassed.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const { setUserName, setCategoryPassed } = userSlice.actions;

export default userSlice.reducer;
