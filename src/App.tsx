import { ChakraProvider, theme } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import Glory from "./glory";
import Quizz from "./quizz";
import User from "./user";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/login" element={<User />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Quizz />
          </PrivateRoute>
        }
      />
      <Route
        path="/glory"
        element={
          <PrivateRoute>
            <Glory />
          </PrivateRoute>
        }
      />
    </Routes>
  </ChakraProvider>
);
