import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import { Avatar ,Text} from '@chakra-ui/react';

// const UserListItem = ({ user, handleFunction }) => {
//     console.log("Rendering user:", user);
//     return(
//         <Box
//         onClick={handleFunction}
//         cursor="pointer"
//         bg="#E8E8E8"
//         _hover={
//             {
//               background:":#38B2AC",
//               color:"white",
//             }
//         }
//         w="100%"
//         d="flex"
//         alignItems={"center"}
//         color="black"
//         px={3}
//         py={2}
//         mb={2}
//         borderRadius="lg"
//         >
//             <Avatar
//             mr={2}
//             size="sm"
//             cursor="pointer"
//             name={user.name}
//             src={user.pic}
//         />
//         <Box>
//             <Text>{user.name}</Text>
//             <Text fontSize="xs">
//                 <b>Email:{user.email}</b>
//             </Text>

//         </Box>

//         </Box>
//     )

// }

// export default UserListItem

// Ensure this is correct in your UserListItem


const UserListItem = ({ user, handleFunction }) => {
    // console.log("Rendering UserListItem with user:", user);

    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{ background: "#38B2AC", color: "white" }}
            w="100%"
            d="flex"
            alignItems="center"
            color="white"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email: {user.email}</b>
                </Text>
            </Box>
        </Box>
    );
};

export default UserListItem;

