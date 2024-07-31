import React, { useState } from "react";
import MessageTable from "./MessageTable";
import NewMessageForm from "./NewMessageForm";
import axios from "axios";
import LoginForm from "./LoginForm";

const MessageBoard = ({ jsonData }) => {
  const [messages, setMessages] = useState(jsonData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addNewMessage = async (values) => {
    const axiosReqConfig = {
      url: `${process.env.NEXT_PUBLIC_HOST}/v1/messages`,
      method: "post",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      data: values,
    };

    try {
      const response = await axios(axiosReqConfig);
      const updatedMessages = [response.data, ...messages];
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logInUser = async (values) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/v1/login`, values);
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
