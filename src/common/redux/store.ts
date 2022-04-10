import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "../../user/userSlice";
import quizzReducer from "../../quizz/quizzSlice";
import glorySlice from "../../glory/glorySlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    quizz: quizzReducer,
    glory: glorySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
