import { createSlice } from "@reduxjs/toolkit";

export interface gloryState {
  isLoading: boolean;
  listGlory: Array<string>;
  error: string | null;
}

const initialState: gloryState = {
  isLoading: false,
  listGlory: ["Luu", "Thanh", "Huy", "Huyen"],
  error: null,
};

export const glorySlice = createSlice({
  name: "glory",
  initialState,
  reducers: {
    addGlory: (state, action) => {
      state.listGlory.push(action.payload);
    },
  },
});

export const { addGlory } = glorySlice.actions;

export default glorySlice.reducer;
