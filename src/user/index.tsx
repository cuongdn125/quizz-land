import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../common/redux/store";
import { fetchUserLogin } from "./userSlice";

export default function User() {
  const navigate = useNavigate();
  const user = localStorage.getItem("userName");
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);
  const [userName, setUserName] = useState("");

  //   const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (userName !== "") {
    }
    dispatch(fetchUserLogin(userName)).then(() => navigate("/"));
  };

  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.200">
      <Box
        h="200px"
        w="500px"
        borderRadius={8}
        boxShadow="xl"
        p="6"
        rounded="md"
        bg="white"
        position="relative"
      >
        <FormControl>
          <FormLabel htmlFor="userName">Create a new user name</FormLabel>
          <Input
            id="name"
            type="text"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />

          <Flex justify="center" mt={6}>
            <Button colorScheme="teal" onClick={handleLogin}>
              Create
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  );
}
