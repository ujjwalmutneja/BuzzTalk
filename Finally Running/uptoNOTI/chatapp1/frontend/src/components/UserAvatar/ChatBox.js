
import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SingleChat  from './SingleChat';

function ChatBox({fetchAgain,setFetchAgain}) {
  const { SelectedChat } =ChatState();
  // console.log("Selectedchat"+SelectedChat); 
  return (
    
    
    <Box 
    display={{ base: SelectedChat && SelectedChat._id ? "flex" : "none",md:"flex"}}
     position={{md:"relative" ,sm: "absolute" }} // Set absolute position for all screen sizes
    //  backgroundColor={{md:"blue",sm:"green"}}
    // zIndex="10" // Ensure it overlaps other elements

    height={{lg: "90.5vh",md:"88.5vh",sm:"88.5vh"}} 
    alignItems="center"
    flexDir="column"
    // p={{base:"0px",md:"0px"}}
    
    bg="white"
    pb={0}
    mr={2}
     borderRadius="lg"
    width={{md:"68%",sm:"100%"}}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/></Box>
  );
}

export default ChatBox








// ////Tiwari
// import React from 'react';
// import { ChatState } from '../../Context/ChatProvider';
// import { Box } from '@chakra-ui/react';
// import SingleChat from './SingleChat';


// const ChatBox = ({ fetchAgain , setFetchAgain }) => {

//   const { selectedChat } = ChatState(); 

//   return (
//     <Box d={{ base: selectedChat ? "flex" : "none" , md: "flex" }}
//       alignItems="center"
//       flexDir="column"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "68%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     > 
//        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
//     </Box>
//   )
// }

// export default ChatBox