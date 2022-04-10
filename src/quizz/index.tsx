import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../common/redux/store";
import CategoryRadio from "./components/CategoryRadio";
import Question from "./components/Question";
import { fetchQuizz, setCategory, toggleQuestion } from "./quizzSlice";
const gloryImg = require("../assets/images/glory.png");

const listCategory = [
  {
    name: "Animal",
    value: 27,
  },
  {
    name: "Art",
    value: 25,
  },
  {
    name: "Vehicle",
    value: 28,
  },
];
export default function Quizz() {
  // const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  // const [toggle, setToggle] = useState(true);
  // const [currentQuestion, setCurrentQuestion] = useState(0);

  const dispatch = useAppDispatch();

  const isLoading = useSelector((state: RootState) => state.quizz.isLoading);
  const questions = useSelector((state: RootState) => state.quizz.quizz);
  const currentQuestion = useSelector(
    (state: RootState) => state.quizz.currentQuestion
  );

  const toggle = useSelector((state: RootState) => state.quizz.toggleQuestion);
  const category = useSelector((state: RootState) => state.quizz.category);

  const categoryPassed = useSelector(
    (state: RootState) => state.user.categoryPassed
  );
  // console.log(questions);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "category",
    onChange: (e) => {
      // setCategory(e);
      dispatch(setCategory(e));
    },
  });
  const group = getRootProps();

  const handlePlay = () => {
    if (category === "") {
      alert("Please select a category");
      return;
    }
    const idCategory = listCategory.find((item) => item.name === category)!;
    const paramsQuizz = {
      category: idCategory.value,
      difficulty: difficulty,
    };
    dispatch(fetchQuizz(paramsQuizz)).then(() => {
      dispatch(toggleQuestion());
    });
  };

  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.200">
      <Box
        h="600px"
        w="500px"
        borderRadius={8}
        boxShadow="xl"
        p="6"
        rounded="md"
        bg="white"
        position="relative"
      >
        <Box display={toggle ? "block" : "none"}>
          <Flex justify="center">
            <Link style={{}} to="/glory">
              <Image src={gloryImg} width="50px" />
            </Link>
          </Flex>
          <Box fontSize="2xl" fontWeight="bold" mt={8}>
            Choose category:
          </Box>
          <Flex {...group}>
            {listCategory.map((value) => {
              const radio = getRadioProps({ value: value.name });
              return (
                <CategoryRadio
                  key={value.value}
                  radioProps={{ ...radio }}
                  disabled={categoryPassed.some((e) => e === value.name)}
                >
                  {value.name}
                </CategoryRadio>
              );
            })}
          </Flex>
          <Select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
            }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
          <Flex mt={6} justify="center">
            <Button
              colorScheme="teal"
              onClick={handlePlay}
              w={"50%"}
              isLoading={isLoading}
            >
              Play
            </Button>
          </Flex>
        </Box>
        <Box display={toggle ? "none" : "block"}>
          {!toggle && questions[currentQuestion] && (
            <Question
              question={questions[currentQuestion]}
              questionNumber={currentQuestion}
            />
          )}
        </Box>
      </Box>
    </Flex>
  );
}
