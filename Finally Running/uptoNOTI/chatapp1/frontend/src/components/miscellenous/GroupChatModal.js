import React, { useState } from 'react'
import { FormControl, Input, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Button,useToast
  } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider';
import axios from "axios"
import UserListItem from '../UserAvatar/UserList';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import { Box } from '@chakra-ui/react';

const Groupchatmodal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName,setGroupChatName]=useState();
    const [selectedUsers,setSelectedUsers]=useState([]);
    const [search,setSearch]=useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [loading,setloading]=useState(false);
    const toast= useToast();


//dlete user using cross
    const handleDelete=(delUser)=>{
      setSelectedUsers(selectedUsers.filter(sel=>sel._id!==delUser._id))
    };
    // selectedUsers.filter(sel => sel._id !== delUser._id) creates a new array by filtering out the user you want to delete.
// filter is a method that iterates through the selectedUsers array.
// For each user (sel) in the array, it checks if their _id does not match the _id of the delUser.
// If _id does not match (sel._id !== delUser._id), the user is included in the new array. If it matches, the user is excluded.


     const handleSearch=async( query)=>{
      setSearch(query);
      if(!query){
        return;
      }

      try{
        setloading(true);

        const config={
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        };

        const {data}=await axios.get(`http://localhost:5000/api/user?search=${search}`,config);
     //   console.log("Search results:", data);
        setloading(false);
        setSearchResult(data)

      }
      catch(error){
        toast({
          title:"Error Occured!",
          description:"Failed to Load the Search Results",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left",
        });

      }
 
     };



     const handleSubmit=async()=>{
      console.log("User:", user);
      if (!user) {
        toast({
          title: "User not authenticated",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }


      if(!groupChatName||!selectedUsers){
        toast({
          title:"Please Fill all Fields",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"top",

        })
        return;
      }
      try{
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        };
        const {data}=await axios.post("http://localhost:5000/api/chat/group",{
          name:groupChatName,
          users:JSON.stringify(selectedUsers.map((u)=>u._id)),
        },
        config
      );
      //new chat created added in list of chat
      setChats([data,...chats]);
      onClose();
      toast({
        title:"New Group Chat Created",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"top",

      })
      }
      catch(error){
        toast({
          title:"Failed to create Group Chat ",
          description:error.response.data,
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom",
  
        })
      }
     };

     const handleGroup=(userToAdd)=>{
      if(selectedUsers.includes(userToAdd)){
        toast({
          title:"User Already added",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"top",

        })
        return;
      }
      //add to array of selected users... means i want to append in that array
      setSelectedUsers([...selectedUsers,userToAdd]);
     };


    const {user,chats,setChats}=ChatState();
   //  console.log('User in Modal:', user);

    return (
        //since button is already made so children will be rendered automattically when button clicked so we use span and children
        <>
    
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
              >Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody display="flex" flexDir="column" alignItems="center">
                <FormControl>
                  <Input placeholder="Chat Name" mb={3} 
                  onChange={(e)=>setGroupChatName(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <Input placeholder="Add Users" mb={1} 
                  onChange={(e)=>handleSearch(e.target.value)}
                  />
                </FormControl>
                {/* {selectedUsers} */}


                <Box w="100%" display="flex" flexWrap="warp">
                    {selectedUsers.map(u=>(
                      <UserBadgeItem key={user._id} user={u} 
                      handleFunction={()=>handleDelete(u)}
                      />

                    ))}

                    
                  </Box>



                {loading?<div>loading</div>:(
                   searchResult?.slice(0,4).map(user=>(<UserListItem key={user._id} user={user} handleFunction={()=> handleGroup(user)}/>
                  //  handle group function so that when we click on it user add to array of selected
                   ))

                   //This is accessing the searchResult array and using optional chaining (?.) to safely check if searchResult exists. If it does, it proceeds to call the slice(0,4) method, which creates a shallow copy of the first four elements of the array.
                  // The slice(0,4) means you are taking elements from index 0 to 3 (the first four users).
                    // 2. .map(user => (...) )// The map() function iterates over the sliced searchResult array and transforms each user item into a JSX element.
                 // 3. <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                    // For each user in the array, you are rendering a UserListItem component.
                   //The key={user._id} is React's way of uniquely identifying each list item to optimize rendering. You are using the user's unique ID (_id).
                  // The user={user} is passing the entire user object as a prop to the UserListItem component.
                )}



            {/* rendered search */}
              </ModalBody>
    
              <ModalFooter>
              {/* backgroundColor='blue' color='white' */}
                <Button onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default Groupchatmodal