import { position, Tooltip } from '@chakra-ui/react';
import { Box ,Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import axios from 'axios';
import React,{useState ,useEffect} from 'react'
// import { Toast } from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { getSender } from '../../config/ChatLogics';/////
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'

import { ChatState } from '../../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import UserListItem from '../UserAvatar/UserList';
import ProfileModal from './ProfileModal';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure ,
  Input
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ChatLoading1 from '../UserAvatar/ChatLoading1'
import { Spinner } from '@chakra-ui/spinner';


import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

const SideDrawer=()=>{
    const [search,setSearch]=useState("")
    const [searchResult,setSearchResult]=useState([])
    const [loading,setLoading]=useState(false);
    const [loadingChat,setLoadingChat]=useState();

    const { user ,setUser, setSelectedChat,chats,setChats ,notification,setNotification}=ChatState();
    const history=useHistory()

    const toast = useToast(); 
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUser(JSON.parse(storedUserInfo)); // Update the user context with the stored data
      }
    }, [setUser]);

    useEffect(() => {
      console.log("Current user data in SideDrawer:", user);
    }, [user]);




    //making chats
    const accessChat=async(userId)=>{
      try{
        setLoadingChat(true);
        const config={
          headers:{
            "Content-type":"application/json",
            Authorization: `Bearer ${user.token}`,
          },    
      };

      const {data}=await axios.post("http://localhost:5000/api/chat",{userId}, config);
    //  console.log(data);

      //if we found old chats append it
      if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();

       }catch(error){

        toast({
          title:"Error Fetching Chat",
          description:error.message,
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
        });
      }

    }


    const logoutHandler=()=>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("authToken");
        history.push("/");
    };
 
    const handleSearch=async()=>{
      if(!search){
        toast({
          title:"please enetr something in search",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"top-left",
        })
        return;
      }

      try{
        setLoading(true);

        const config={
          headers:{
            Authorization: `Bearer ${user.token}`,
          },
        };
        // console.log(`Requesting: http://localhost:5000/api/user?search=${search}`);
        const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
       // console.log(data);
        setLoading(false);
        setSearchResult(data);
      }
       catch(error){
        toast({
          title:"Error Occured!",
          description:"Failed to Load The search Result",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
    
        })
      }
    }

  
    return(
        //Box
        <>
        <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        >
     

        <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
            <Button variant="ghost" onClick= {onOpen }>
            <i className="fa-solid fa-magnifying-glass"></i>
            {/* base means small screen md means medium screen */}
            <Text display={{base:"none", md:"flex"}} px='4'>
                Search User
            </Text>
            </Button>
        </Tooltip> 


        <Text fontSize="2xl" fontFamily="Work sans">
             BUZZ-TALK
        </Text>


        <div>
          <Menu>
            <MenuButton p={1}>

          
              <NotificationBadge          
              count = {notification.length}
              effect={Effect.SCALE}
              />                          



            <BellIcon fontSize="2xl" m={1}/>
            </MenuButton>

             <MenuList pl={2}>
  {!notification.length ? (
    'No New Message'
  ) : (
    notification.map((notif) => (
      <MenuItem
        key={notif._id}
        onClick={() => {
          setSelectedChat(notif.chat);
          setNotification(notification.filter((n) => n !== notif));
        }}
      >
        {notif.chat.isGroupChat
          ? `New Message in ${notif.chat.chatName}`
          : `New Message from ${getSender(user, notif.chat.users)}`}
      </MenuItem>
    ))
  )}
</MenuList>
   
 
{/* 
  console.log("Notifications: ", notification); */}
  {/* <MenuList pl={2}>
  {(!notification || notification.length === 0) ? (
    'No New Message'
  ) : (
    notification.map((notif) => {
      console.log("Notification:", notif);  // Logs each notification
      if (notif && notif.chat) {
        console.log("Chat in notification: ", notif.chat);  // Logs the chat object inside the notification
      }
      return (
        notif && notif.chat ? (
          <MenuItem
            key={notif._id}
            onClick={() => {
              setSelectedChat(notif.chat);
              setNotification(notification.filter((n) => n !== notif));
            }}
          >
            {notif.chat.isGroupChat
              ? `New Message in ${notif.chat.chatName}`
              : `New Message from ${getSender(user, notif.chat.users)}`}
          </MenuItem>
        ) : null
      );
    })
  )}
</MenuList> */}


            

            
          </Menu>
          <Menu>  
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
          {/* //fetching this from  chatstate in usecontext*/}
             <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}/>
           </MenuButton>
           
           <MenuList>
            <ProfileModal user={user}>
            <MenuItem> My Profile</MenuItem>
            </ProfileModal >
            <MenuItem onClick={logoutHandler}> Log Out </MenuItem>
           </MenuList>
          </Menu>
        </div>

        <Drawer placement="left" onClose={ onClose } isOpen={ isOpen }>
          <DrawerOverlay/>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
        
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
              placeholder="Search By name or email"
              mr={2}
              value={search}
              onChange={(e)=>setSearch(e.target.value)}/>
              
              <Button 
               onClick={handleSearch} >
                Go</Button>
            </Box>

            {/* //what we did here is setchatresult se chatresult me data store karwa diya and ab usko ek ek ko fetch karna ke liya map used */}
            {loading?(
              <ChatLoading1/>
            ):(
              searchResult?.map((user)=>(
                <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
                />
              ))
            )
             
            }
            {loadingChat && <Spinner m1="auto" d="flex"/>}
          </DrawerBody>
          </DrawerContent>
        </Drawer>
        </Box> 
        </>
    );
};

export default SideDrawer;














///the above same code i have written to debug error


         {/* <MenuList pl={2}>
  {(!notification || notification.length === 0) ? (
    'No New Message'
  ) : (
    notification.map((notif) => (
      <MenuItem
        key={notif._id}
        onClick={() => {
          setSelectedChat(notif.chat);
          setNotification(notification.filter((n) => n !== notif));
        }}
      >
        {notif.chat.isGroupChat
          ? `New Message in ${notif.chat.chatName}`
          : `New Message from ${getSender(user, notif.chat.users)}`}
      </MenuItem>
    ))
  )}
</MenuList>
 */}
