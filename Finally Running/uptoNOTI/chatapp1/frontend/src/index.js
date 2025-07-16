// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { ChakraProvider } from '@chakra-ui/react';
// import { BrowserRouter } from "react-router-dom";


// //const root = ReactDOM.createRoot(document.getElementById('root'));
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { ChakraProvider } from '@chakra-ui/react'
// import { BrowserRouter } from 'react-router-dom';
// import ChatProvider from './Context/ChatProvide';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   //chat provider is done so that the state which we create using context is accesible to whole app
//   <ChatProvider>
//     <BrowserRouter>
//     <ChakraProvider>
//     <App />
//     </ChakraProvider>
//     </BrowserRouter>
//   </ChatProvider>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';
// import HomePag from './Homed';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);