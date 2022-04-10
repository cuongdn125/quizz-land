import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../common/redux/store";

export default function Glory() {
  const listGlory = useSelector((state: RootState) => state.glory.listGlory);
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
        <Flex justify="center">
          <Box fontSize={"3xl"} fontWeight="bold">
            Glory:
          </Box>
        </Flex>
        {listGlory.map((item, index) => (
          <Box
            key={index}
            bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
            w={"100%"}
            p={4}
            m={2}
            borderRadius={8}
            fontWeight="bold"
            // color="white"
          >
            {item}
          </Box>
        ))}
        <Box
          position="absolute"
          bottom={10}
          right={6}
          px={6}
          py={2}
          bg="gray.100"
          borderRadius={8}
          fontSize="16px"
          fontWeight="bold"
          _hover={{
            bg: "gray.200",
          }}
        >
          <Link to="/">Exit</Link>
        </Box>
      </Box>
    </Flex>
  );
}
