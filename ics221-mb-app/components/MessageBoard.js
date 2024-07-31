import React, { useState } from "react";
import MessageTable from "./MessageTable";
import NewMessageForm from "./NewMessageForm";
import axios from "axios";
import LoginForm from "./LoginForm";

const MessageBoard = ({ jsonData }) => {
  const [messages, setMessages] = useState(jsonData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addNewMessage = async (values) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/v1/messages`, values)
      .then((response) => {
        const updatedMessages = [response.data, ...messages];
        setMessages(updatedMessages);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  };

  const logInUser = (values) => {
    console.log(values);
    // TODO: change the state of the boolean state hook to true (call the set function)
    axios
    .post(`${process.env.NEXT_PUBLIC_HOST}/v1/login`, values)
    .catch((error) => {
      console.error("Error:", error.response.data);
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <NewMessageForm addNewMessage={addNewMessage} />
      ) : (
        <LoginForm logInUser={logInUser} />
      )}
      <MessageTable messages={messages} />
    </>
  );
};

export default MessageBoard;
