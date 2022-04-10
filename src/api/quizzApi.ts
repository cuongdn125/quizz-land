import { QuizzParams } from "../quizz/quizzSlice";
import axiosClient from "./apiClient";

export interface Quizz {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

export interface QuizzResult {
  category: string;
  difficulty: string;
  response_code: number;
  results: Array<Quizz>;
}

export const getQuizz = async (params: QuizzParams): Promise<QuizzResult> => {
  const response: QuizzResult = await axiosClient.get("/", {
    params: {
      ...params,
      amount: 4,
      type: "multiple",
    },
  });
  return response;
};
