
import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, position } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useAnimation } from 'framer-motion';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { useHistory } from 'react-router-dom';




const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [pic, setPic] = useState(null); // Updated to null for better state initialization
  const [show, setShow] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const FormData = require('form-data');
  const history = useHistory();
  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image',
        status: 'Warning',
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      
      return;
    }
    if (pics.type == "image/jpeg" || pics.type == "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat app");
      data.append("cloud_name", "did5qxthv");
      fetch("https://api.cloudinary.com/v1_1/did5qxthv/image/upload", {
        method: 'post',
        body: data,
      }).then((res) => res.json())
        .then((data) => {
           //console.log(data); 
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
        //  console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: 'Please Select an Valid Image',
        status: 'Warning',
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    // Handle form submission
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {

      toast({
        title: "Password Do not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    //otherwise store api in database
    //data we are going to send is application/json we need to set headers
    //the Content-type: application/json in the headers object is used to specify that the data being sent in the HTTP request body is in JSON (JavaScript Object Notation) format
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      /////////////////////////main api
      const { data } = await axios.post("http://localhost:5000/api/user", { name, email, password, pic }, config);
    //  console.log("Response Data:", data);
      toast({
        title: "Registration Succesfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push("/chats")
    }
    catch (error) {
      toast({
        title: "Error Occured",
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
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='confirm-password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm your Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        backgroundColor="blue"
        color='white'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
export default Signup;

