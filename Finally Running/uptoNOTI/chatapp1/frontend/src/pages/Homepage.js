import React, { useEffect } from 'react'
import { Container,Box ,Text} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
import {  useHistory } from 'react-router-dom'
import ChatBot from "../components/UserAvatar/Bot";

const Homepage = () => {
  //if user loggedin
   const history=useHistory();

   useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("userInfo"));

    if(user) history.push("/chats");

   },[history])
   //if user alraedy logged in send him back to chats page


  return (
    <Container maxW='xl' centerContent> 
      {/* <Box d="flex" justifyContent="Center" p={7} bg={"white"} w="100%" m="90px 20 15px 30p" borderRadius="lg" borderWidth="1px"> */}
        <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        p={6}
        bg={"white"}
        w="100%"
        m="40px 0px 15px 0px"
        borderRadius="lg"
        borderWidth="1px"
        textAlign={"center"}
      >
        <Text fontSize='25px'
          fontFamily="work sans"
          color="black"
        >BUZZ-TALK</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="1g" borderwidth="1px">
        <Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
        <Login/>
          
    </TabPanel>
    <TabPanel>
        <Signup/>      
  
    </TabPanel>
  </TabPanels>
</Tabs>
      
      </Box>

      <Box>
        <ChatBot />
      </Box>
    </Container>
  )
}

export default Homepage
