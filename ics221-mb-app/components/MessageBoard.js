import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import MessageTable from "./MessageTable";
import NewMessageForm from "./NewMessageForm";

const ADD_MESSAGE = gql`
  mutation AddMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      name
      msgText
    }
  }
`;

const MessageBoard = ({ jsonData }) => {
  const [messages, setMessages] = useState(jsonData);
  const [addMessage] = useMutation(ADD_MESSAGE);

  const addNewMessage = async (values) => {
    try {
      const { data } = await addMessage({
        variables: { message: values },
      });
      setMessages([data.addMessage, ...messages]);
    } catch (error) {
      console.error("Error adding message:", error);
      console.error("Error details:", error.networkError?.result || error.message);
    }
  };

  return (
    <>
      <NewMessageForm addNewMessage={addNewMessage} />
      <MessageTable messages={messages} />
    </>
  );
};

export default MessageBoard;
