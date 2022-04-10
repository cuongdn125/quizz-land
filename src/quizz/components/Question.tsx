import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Quizz } from "../../api/quizzApi";
import { RootState, useAppDispatch } from "../../common/redux/store";
import { addGlory } from "../../glory/glorySlice";
import { postCategoryPassed } from "../../user/userSlice";
import { setCurrentQuestion, toggleQuestion } from "../quizzSlice";
import AnswerRadio from "./AnswerRadio";

export default function Question(props: {
  question: Quizz;
  questionNumber: number;
}) {
  const { question, correct_answer, incorrect_answers } = props.question;

  const [showDescription, setShowDescription] = useState(false);

  const [correctNumber, setCorrectNumber] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isCorrect, setIsCorrect] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggle = useSelector((state: RootState) => state.quizz.toggleQuestion);
  const currentQuestion = useSelector(
    (state: RootState) => state.quizz.currentQuestion
  );
  const category = useSelector((state: RootState) => state.quizz.category);
  // console.log(category);

  const categoryPassed = useSelector(
    (state: RootState) => state.user.categoryPassed
  );

  const userName = useSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  const answer = useMemo(() => {
    return [correct_answer, ...incorrect_answers].sort(
      () => Math.random() - 0.5
    );
  }, [correct_answer, incorrect_answers]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "answer",
    onChange: (e) => {
      if (e === correct_answer) {
        if (correctNumber === 3) {
          const passed = [...categoryPassed, category];

          if (passed.length === 3) {
            dispatch(addGlory(userName));
          }
          dispatch(postCategoryPassed(passed));

          onOpen();
        }

        setCorrectNumber(correctNumber + 1);
        setIsCorrect(1);
        setShowDescription(true);
      } else {
        setIsCorrect(0);
      }
      setDisabled(true);
    },
  });
  const group = getRootProps();
  // console.log(group);

  const handleExit = () => {
    setDisabled(false);
    setIsCorrect(-1);
    setShowDescription(false);
    setCorrectNumber(0);
    dispatch(setCurrentQuestion(0));
    dispatch(toggleQuestion());
  };
  const handleContinue = () => {
    setIsCorrect(-1);
    setDisabled(false);
    setShowDescription(false);
    dispatch(setCurrentQuestion(currentQuestion + 1));
  };

  const handleDone = () => {
    // if (correctNumber === 4) {
    //   const passed = [...categoryPassed, category];
    //   dispatch(postCategoryPassed(passed)).then(() => {
    //     handleExit();
    //   });
    // } else {
    handleExit();
    // }
  };

  return (
    <Box>
      <Box>Correct: {correctNumber}/4</Box>
      <Box fontSize="1rem" p={2}>
        <span>Question {props.questionNumber + 1}: </span>
        {question}
      </Box>
      <Box mt={6} {...group}>
        {answer.map((item) => {
          const radio = getRadioProps({ value: item });
          return (
            <AnswerRadio
              key={item}
              radioProps={{ ...radio }}
              disabled={disabled}
              isCorrect={isCorrect}
            >
              {item}
            </AnswerRadio>
          );
        })}
      </Box>
      <Box>
        {showDescription && (
          <Box>
            <span>Description: </span>explain
          </Box>
        )}
      </Box>
      <Flex my={6} mx={2}>
        {currentQuestion < 3 && (
          <Button onClick={handleContinue}>Continue</Button>
        )}
        {currentQuestion === 3 && <Button onClick={handleDone}>Done</Button>}

        <Spacer />
        <Button onClick={handleExit} display={toggle ? "none" : "block"}>
          Exit
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Congratulations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>You have passed the quiz!</Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
