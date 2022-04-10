import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";
import React from "react";

interface AnswerProps {
  radioProps: UseRadioProps;
  children: string;
  disabled?: boolean;
  isCorrect: number;
}
function AnswerRadio({
  disabled,
  radioProps,
  children,
  isCorrect,
}: AnswerProps) {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} disabled={disabled} />
      <Box
        {...checkbox}
        _checked={{
          bg: isCorrect < 0 ? "gray.300" : isCorrect ? "green.500" : "red.500",
        }}
        _hover={{
          bg: disabled ? "" : "gray.500",
        }}
        cursor="pointer"
        p={4}
        m={2}
        borderRadius={10}
        bg="gray.300"
      >
        {children}
      </Box>
    </Box>
  );
}

export default AnswerRadio;
