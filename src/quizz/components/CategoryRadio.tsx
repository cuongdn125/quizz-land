import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  useRadio,
  UseRadioProps,
} from "@chakra-ui/react";
import React from "react";
import { getCategoryImg } from "../constant";
const check = require("../../assets/images/check.png");

interface RadioCardProps {
  radioProps: UseRadioProps;
  children: string;
  disabled?: boolean;
}
export default function CategoryRadio({
  radioProps,
  children,
  disabled,
}: RadioCardProps) {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box flex={1} m={5} as="label">
      <input {...input} disabled={disabled} />
      <Box
        {...checkbox}
        _checked={{
          bg: "rgba(0,0,0,0.5)",
          "& .img_category": {
            opacity: 0.3,
          },
          "& .check": {
            display: "flex",
          },
          "& .text_category": {
            color: "white",
          },
        }}
        cursor="pointer"
        p={5}
        borderRadius={10}
        position="relative"
      >
        <Image
          src={getCategoryImg(children)}
          className="img_category"
          opacity={1}
        />
        <Flex
          className="check"
          display="none"
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          justify="center"
        >
          <Center w={"50%"}>
            <Image src={check} />
          </Center>
        </Flex>
        <Text
          className="text_category"
          textAlign={"center"}
          mt={4}
          fontSize={["sm", "md", "lg"]}
          fontWeight="bold"
        >
          {children}
        </Text>
      </Box>
    </Box>
  );
}
