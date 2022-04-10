import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuizz, Quizz } from "../api/quizzApi";

export interface QuizzParams {
  category: number;
  difficulty: string;
}

export const fetchQuizz = createAsyncThunk(
  "quizz/fetchQuizz",
  async (params: QuizzParams) => {
    const response = await getQuizz(params);
    return response;
  }
);

export interface QuizzState {
  toggleQuestion: boolean;
  isLoading: boolean;
  category: string;
  currentQuestion: number;
  error: string | undefined;
  quizz: Array<Quizz>;
}

const initialState: QuizzState = {
  toggleQuestion: true,
  category: "",
  isLoading: false,
  currentQuestion: 0,
  error: undefined,
  quizz: [],
};

export const quizzSlice = createSlice({
  name: "quizz",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    toggleQuestion: (state) => {
      state.toggleQuestion = !state.toggleQuestion;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuizz.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchQuizz.fulfilled, (state, action) => {
      state.isLoading = false;
      state.quizz = action.payload.results;
    });
    builder.addCase(fetchQuizz.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const { setCurrentQuestion, toggleQuestion, setCategory } =
  quizzSlice.actions;

export default quizzSlice.reducer;
