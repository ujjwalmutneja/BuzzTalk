

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Input, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { AiOutlineRobot } from "react-icons/ai";

const ChatBot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sessionId, setSessionId] = useState(null); // Store session ID
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState("");
  

  // Initialize session on first load
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/api/init");
        setSessionId(response.data.session_id); // Save session ID from backend
        setMessages([{ text: response.data.message, from: "bot" }]);
      } catch (error) {
        console.error("Error initializing chat session:", error.message);
      }
    };

    initializeSession();
  }, [isOpen]);

  const onCloseHandler = () => {
  setMessages([]); // Clear the messages
  onClose(); // Close the drawer
};


  

  // Handle user input submission
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Display user input in the chat
    setMessages((prev) => [...prev, { text: userInput, from: "user" }]);
    setUserInput("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/chat/b",
        { session_id: sessionId, message: userInput },
        { headers: { "Content-Type": "application/json" } }
      );

      // Display bot's response in the chat
      setMessages((prev) => [...prev, { text: response.data.message, from: "bot" }]);
      if (response.data.follow_up) {
        setMessages((prev) => [...prev, { text: response.data.follow_up, from: "bot" }]);
      }
  

      // Update suggestions if provided
      if (response.data.questions) {
        setSuggestions(response.data.questions.map((q) => q.question));
      } else {
        setSuggestions([]); // Clear suggestions if not provided
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  // Handle clicking on suggestion
  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
  };

  return (
    <>
      {!isOpen && (<Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="9999"
        borderRadius="50%"
        bg="blue.500"
        color="white"
        p={4}
        cursor="pointer"
        boxShadow="lg"
        onClick={onOpen}
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{ bg: "blue.600" }}
      >
        <AiOutlineRobot size="24px" />
      </Box>

      )}

      

      <Drawer isOpen={isOpen} placement="right" onClose={onCloseHandler} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chatbot</DrawerHeader>
          <DrawerBody>
            {/* Chat Messages */}
            <Box overflowY="auto" maxH="calc(100vh - 200px)" p={2}>
         
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  my={2}
                  p={3}
                  bg={msg.from === "user" ? "blue.100" : "gray.100"}
                  borderRadius="md"
                  textAlign={msg.from === "user" ? "right" : "left"}
                >
                  {msg.text}
                </Box>
              ))}
            </Box>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <Box mt={4}>
                <p>Suggestions:</p>
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    my={1}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter>
            {/* Input Field */}
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              mr={2}
            />
            <Button colorScheme="blue" onClick={handleSendMessage}>
              Send
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChatBot;
