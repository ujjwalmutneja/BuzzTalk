// import React ,{useState,useEffect } from 'react'
// import { Button, chakra, useToast,Stack ,Text} from '@chakra-ui/react';
// import { ChatState } from '../../Context/ChatProvider';
// import axios from 'axios'
// import { Box } from "@chakra-ui/layout"
// import { AddIcon } from '@chakra-ui/icons';
// import ChatLoading1 from './ChatLoading1';
// import { getSender } from '../../config/ChatLogics';
// // import GroupChatModal from '../miscellenous/GroupChatModal';
// import GroupChatModal from "../miscellenous/GroupChatModal"

// const MyChats=({fetchAgain})=>{
//   //import all states
//   const [loggedUser,setLoggedUser]=useState();
//   const[loadingChat,setLoadingChat]=useState(false);
//   const{ SelectedChat,setSelectedChat,user,chats,setChats}=ChatState();
//   const [mydata,setmydata]=React.useState([]);

//   const toast=useToast();

//   const fetchChats=async()=>{
//       try{
//       setLoadingChat(true);
//       const config={
//         headers:{
//           Authorization: `Bearer ${user.token}`,
//         },

//       };
//       const { data } = await axios.get("http://localhost:5000/api/chat", config);
//     //   console.log("running access chats")
//      //  console.log(data);
//        setChats(data);
//        setmydata(data)
//       }

//       catch(error){
//        toast({
//         title:"Error Occured!",
//         description:"Failed to Load The search Result",
//         status:"error",
//         duration:5000,
//         isClosable:true,
//         position:"bottom-left"
  
//       });
//     }
//   };

//   ///The issue is that setLoggedUser is a state setter function, and it doesn't return the updated state. Instead, setLoggedUser schedules an update to the state, and the new state value is not immediately available. As a result, userInfo will be undefined because setLoggedUser does not return anything.
//   // useEffect(()=>{
//   //   const userInfo = setLoggedUser(JSON.parse(localStorage.getItem("userinfo")));
//   //   console.log("Logged User from localStorage:", userInfo); // Log loggedUser from localStorage
//   //   setLoggedUser(userInfo);// Update the state
//   //   fetchChats();
//   // },[]);

//   // useEffect(() => {
//   //   console.log("Logged User State:", loggedUser); // Log loggedUser state
//   // }, [loggedUser]);
//   useEffect(() => {
//     // Retrieve user information from localStorage
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   //  console.log("Logged User from localStorage:", userInfo);
    
//     // Set the loggedUser state
//     if (userInfo) {
//         setLoggedUser(userInfo);
//     } else {
//        // console.log("No user info found in localStorage");
//     }
//     // Fetch chats after setting the user
//     fetchChats();
// }, [mydata]);


//   return <Box
//   //if chat selcted display chat screen and dusri none
//   display={{base:SelectedChat?"flex":"none",md:"flex",sm:"flex"}}
//   flexDir="column"
//   alignItems="center"
//   p={3}
//   bg="white"
//   w={{base:"100%" ,md:"31%"}}
//   borderRadius="lg"
//   borderWidth="1px"
//   >
//     <Box
//     pb={3}
//     px={3}
//     fontSize={{base:"28px",md:"30px"}}
//     fontFamily="Work sans"
//     display="flex"
//     w="100%"
//     justifyContent="space-between"
//     alignItems="center"
//     overflow={"hidden"}
//     >MyChats
//    <GroupChatModal>
//     <Button
//     //  display="flex"
//     //  fontSize={{base:"12px",md:"10px",lg:"14px"}}
//     //  rightIcon={<AddIcon/>}
//     display="flex"
//     fontSize={{ base: "16px", md: "14px", lg: "17px" }}
//     padding={{ base: "10px 16px", md: "8px 12px", lg: "12px 20px" }}  // Adjusting padding for different screens
//     width={{ base: "100%", md: "auto", lg: "auto" }}  // Full width on small screens, auto width on larger screens
//     rightIcon={<AddIcon />}
//     >
//       New Group Chat
//     </Button>
//     </GroupChatModal>
//     </Box>

//     <Box
//     display="flex"
//     flexDirection="column"
//     p={3}
//     bg="#F8F8F8"
//     w="100%"
//     h="100%"
//     borderRadius="lg"
//     overflowY="hidden"
//     >
//       {chats?(
//         <Stack overflowY="scroll">
//           {chats.map((chat)=>(
  
//             <Box
//             onClick={()=>setSelectedChat(chat)}
//             cursor="pointer"
//             bg={SelectedChat?._id === chat._id ? "#38B2AC" : "#E8E8E8"}
//             color={SelectedChat?._id === chat._id ? "white" : "black"}
//             px={3}
//             py={2}
//             borderRadius="lg"
//             key={chat._id}
//             >
//               <Text>
//                 {!chat.isGroupChat?
//                   getSender(loggedUser,chat.users)
//                 :chat.chatName}

//               </Text>

//             </Box>
//           ))}
//         </Stack>
//       ):(
//         <ChatLoading1/>
//       )}
//     </Box>
//   </Box>
// }

// export default MyChats





/////////if something not working uncomment upar vala code
import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading1 from "./ChatLoading1";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "../miscellenous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  // Fetch Chats from Backend
  const fetchChats = async () => {
    if (!user) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(userInfo);
    fetchChats();
  }, [fetchAgain]); // Re-fetch when `fetchAgain` changes

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {/* Header */}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "16px", md: "14px", lg: "17px" }}
            padding={{ base: "10px 16px", md: "8px 12px", lg: "12px 20px" }}
            width={{ base: "100%", md: "auto" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      {/* Chats List */}
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="scroll"
      >
        {chats ? (
          <Stack>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat?._id === chat._id ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat?._id === chat._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Text fontWeight="bold">
                  {chat.isGroupChat
                    ? chat.chatName
                    : getSender(loggedUser, chat.users)}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="sm" color="gray.500">
                    <b>{chat.latestMessage.sender.name}: </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 50) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading1 />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
