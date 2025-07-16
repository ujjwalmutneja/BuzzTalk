import React from 'react'
import { IconButton, useDisclosure ,Button,Image,Text} from '@chakra-ui/react'
import {ViewIcon } from "@chakra-ui/icons"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'



const ProfileModal = ({user ,children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
   // console.log("User updated:", user);
  }, [user]);


  //if children then on open else view icon
  return (
  <>
   {children ?(
    <span onClick={onOpen}>{children}</span>
   ):(
    <IconButton d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
     )}

<Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent bg="white" height="410x" >

          <ModalHeader
            fontSize="40px"

            fontfamily="Work sans"
            display="flex"
            justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
           display="flex"
           flexDir="column"
           alignItems="center"
           justifyContent="space-between"
          >
          <Image
          borderRadius="full"
          width="270px" // Set the width of the image
          height="190px" // Set the height of the im
          src={user.pic}
          alt={user.name}
          />
          <Text
           fontSize={{base:"28px",md:"30px"}}
           fontFamily="Work sans"
          >
            Email:{user.email}
          </Text>
           </ModalBody>

          <ModalFooter>
            <Button backgroundColor='green' color="white" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  
   </>
  );
};

export default ProfileModal;