import React, { useState } from "react";
import MessageTable from "./MessageTable";
import NewMessageForm from "./NewMessageForm";
import axios from "axios";

const MessageBoard = ({ jsonData }) => {
  const [messages, setMessages] = useState(jsonData);

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

  return (
    <>
      <NewMessageForm addNewMessage={addNewMessage} />
      <MessageTable messages={messages} />
    </>
  );
};

export default MessageBoard;
