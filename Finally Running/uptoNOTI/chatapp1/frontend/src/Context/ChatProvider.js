// // // import {createContext, useContext,useState,useEffect} from 'react'
// // // import { useHistory } from 'react-router-dom';

// // // const ChatContext=createContext()

// // // const ChatProvider=({children})=>{
// // //     //now this user state is accessible to whole app as passsed this as object value in Chatcontext
// // //     const [user,setUser]=useState();

// // //     const history=useHistory();

// // //     useEffect(()=>{
// // //         const userInfo=JSON.parse(localStorage.getItem("userInfo"));
// // //         setUser(userInfo);

// // //         if(!userInfo){
// // //             history.push("/");
// // //         }
// // //     },[history]);

   
// // //     return (
// // //         <ChatContext.Provider value={{ user,setUser}}>
// // //            {children} 
// // //         </ChatContext.Provider>
// // //     )
// // // };


// // // export const ChatState=()=>{
// // //   return useContext(ChatContext);
// // // }

// // // export default ChatProvider


// // import { createContext, useContext, useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom'; // Updated to useNavigate

// // const ChatContext = createContext();

// // const ChatProvider = ({ children }) => {
// //     const [user, setUser] = useState();
// //     const navigate = useNavigate(); // Updated from useHistory

// //     useEffect(() => {
// //         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
// //         setUser(userInfo);

// //         if (!userInfo) {
// //             navigate("/"); // Updated from history.push
// //         }
// //     }, [navigate]);

// //     return (
// //         <ChatContext.Provider value={{ user, setUser }}>
// //             {children}
// //         </ChatContext.Provider>
// //     );
// // };

// // export const ChatState = () => {
// //     return useContext(ChatContext);
// // };

// // export default ChatProvider;


// import { createContext, useContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// // Creating the ChatContext
// const ChatContext = createContext();

// // Creating the ChatProvider component that will wrap the application
// const ChatProvider = ({ children }) => {
//     const [user, setUser] = useState();
//     const navigate = useHistory(); // Initialize useNavigate

//     useEffect(() => {
//         // Retrieving user information from local storage
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        
//         // If user info exists, set it to state
//         setUser(userInfo);

//         // If user info does not exist, navigate to the login page
//         if (!userInfo) {
//             navigate("/"); 
//         }
//     }, [navigate]);

//     return (
//         // Providing user and setUser to the context
//         <ChatContext.Provider value={{ user, setUser }}>
//             {children}
//         </ChatContext.Provider>
//     );
// };

// // Exporting the ChatState hook for consuming the context
// export const ChatState = () => {
//     return useContext(ChatContext);
// };

// export default ChatProvider;

import { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Correct for v5

// Creating the ChatContext
const ChatContext = createContext();

// Creating the ChatProvider component that will wrap the application
const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [SelectedChat,setSelectedChat]=useState(false);
    const [chats,setChats]=useState([]);//so to populate current chat in chat state
    const [notification,setNotification]=useState([])
    const history = useHistory(); 


    useEffect(() => {
        // Retrieving user information from local storage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        
        // If user info exists, set it to state
        setUser(userInfo);

        // If user info does not exist, navigate to the login page
        if (!userInfo) {
            history.push("/"); // Correct for v5
        }
    }, [history]);

  //  console.log("initial",SelectedChat);

    return (
        // Providing user and setUser to the context
        <ChatContext.Provider value={{ user, setUser ,SelectedChat,setSelectedChat,chats,setChats,notification,setNotification}}>
            {children}
        </ChatContext.Provider>

    );
};

// Exporting the ChatState hook for consuming the context
export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;


