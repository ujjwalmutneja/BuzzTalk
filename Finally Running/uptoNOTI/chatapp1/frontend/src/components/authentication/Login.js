import React from 'react'
import { Stack, HStack, VStack, Box, StackDivider } from '@chakra-ui/react'
import { FormControl, FormLabel, Input, InputGroup, Button ,InputRightElement} from '@chakra-ui/react';
import { useState } from 'react';
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import {useHistory} from "react-router-dom"


//The actual validation logic (e.g., checking if the email and password match a user in the database) is implemented on the server.
//The client-side (React) code merely sends the credentials to the server and reacts based on the response it receives.



const Login = () => {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setLoading]=useState(false)
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const handleClick = () => setShow(!show);


  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
       toast({
        title: "please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    // Handle form submission
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }, 
      };

       ////The function uses axios.post to send an HTTP POST request to the server at http://localhost:5000/api/user/login.
      ///The request body contains the email and password that the user entered.
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
       // The config object is passed along with the request to ensure that the server understands the content type.
        config
      );
     
        toast({
        title: "Login Succesfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        });
     // console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('authToken', data.token); // Store the token
      setLoading(false);
      history.push('/chats')

    } catch (error) {
        toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        });
      setLoading(false);
    }
  };

  return (
    <VStack spacing='5px' width='100%' padding='20px'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input value={email} placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input 
            type={show ? "text" : "password"} 
            placeholder="Enter your Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        backgroundColor="blue"
        color="white"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        LOGIN
      </Button>

      <Button variant="solid"
        backgroundColor='red'
        color='white'
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }
        }
      >Get Guest User Credentials

      </Button>
    </VStack>
  );
};

export default Login;


