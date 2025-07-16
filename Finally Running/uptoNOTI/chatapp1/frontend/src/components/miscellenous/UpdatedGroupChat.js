
import React, { useState } from 'react';
import { Box, FormControl, IconButton, Input, useDisclosure } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Spinner,
  
} from '@chakra-ui/react';
import UserListItem from '../UserAvatar/UserList';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';

const UpdatedGroupChatModal = ({ fetchAgain, setFetchAgain ,fetchmessages}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameloading] = useState(false);
  const toast = useToast();


  const handleAddUser=async(user1)=>{
    if(SelectedChat.users.find((u)=>u._id === user1._id)){
        toast({
          title: "User already added",
          status:"error",
          duration:5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      if(SelectedChat.groupAdmin._id !== user._id){
        toast({
          title: "Only admins can add users",
          status:"error",
          duration:5000,
          isClosable: true,
          position: "bottom",
        
        })
        return;
      }
      try {
        setLoading(true);
        const config ={
          headers:{
            Authorization: `Bearer ${user.token}`,
          },
  
        };
        const{data} = await axios.put('http://localhost:5000/api/chat/groupadd', {
          chatId: SelectedChat._id,
          userId: user1._id,
        }, config);
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false)    
      }
  }





  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameloading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put('http://localhost:5000/api/chat/rename', {
        chatId: SelectedChat._id,
        chatName: groupChatName,
      }, config);

      // Update the selected chat with the new name
      setSelectedChat({ ...SelectedChat, chatName: data.chatName });

      setFetchAgain(!fetchAgain); // Trigger re-fetch if necessary
      setRenameloading(false);
      toast({
        title: 'Chat name updated!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setRenameloading(false);
    }
    setGroupChatName(''); // Clear the input field
};


  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: 'Failed to load the search results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
      setLoading(false);
    }
  };

  const handleRemove = async (user1) => {
    // Ensure only the group admin or the user themselves can remove a user
    //user1 is logged in user and if user who is trying to remove is not logged in or he is nota adminu ser don't allow him 
    if (SelectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove users",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  
    try {
      setLoading(true); // Show loading indicator
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      // API call to remove the user from the group
      const { data } = await axios.put(
        'http://localhost:5000/api/chat/groupremove',
        {
          chatId: SelectedChat._id,
          userId: user1._id,
        },
        config
      );
  
      // Update the chat UI after removing the user
      if (user1._id === user._id) {
        setSelectedChat(); // If the current user removed themselves, clear the selected chat
      } else {
        setSelectedChat(data); // Otherwise, update the selected chat with the new group details
      }
       
    fetchmessages();
      setFetchAgain(!fetchAgain); // Trigger UI update elsewhere if necessary
      setLoading(false);
  
      toast({
        title: "User removed successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Failed to remove the user",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };




  const { SelectedChat, setSelectedChat, user } = ChatState();

  return (
    <>
    <IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />

    <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader
        fontSize="35px"
        fontFamily="Work sans"
        display="flex"
        justifyContent="center"
      >
        {SelectedChat.chatName}
      </ModalHeader>
      <ModalCloseButton />
      {/* here in box we are loadinga all users in group */}
      <ModalBody>
        <Box display="flex" flexWrap="wrap" w="100%" p={3}>
          {SelectedChat.users.map((u) => (
            <UserBadgeItem 
            key={u._id} 
            user={u} 
            handleFunction={() => handleRemove(u)} />
          ))}
        </Box>

        <FormControl>
          <Input
            placeholder="Chat Name"
            mb={3}
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <Button
            variant="solid"
            colorScheme="teal"
            ml={1}
            isLoading={renameloading}
            onClick={handleRename}
          >
            Update
          </Button>
        </FormControl>
        <FormControl>
          <Input
            placeholder="Add User to the group"
            mb={1}
            onChange={(e) => handleSearch(e.target.value)}
          />

        </FormControl>
        { loading ?(
          <Spinner size="lg" />
        ) :(
          searchResult?.map((user) => (
            <UserListItem
            key = {user._id}
            user={user}
            handleFunction={()=> handleAddUser(user)}
            />
          ))
        )}
      </ModalBody>

      <ModalFooter>
        <Button onClick={() => handleRemove(user)} colorScheme="red">
          Leave Group
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>



  </>
  )
}

export default UpdatedGroupChatModal;