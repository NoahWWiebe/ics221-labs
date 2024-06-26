import React, { useState } from 'react';
import MessageTable from './MessageTable';
import NewMessageForm from './NewMessageForm';

const MessageBoard = ({ jsonData }) => {
    const [messages, setMessages] = useState(jsonData);

    const addNewMessage = (values) => {
        values.id = messages.length;
        const updatedMessages = [values, ...messages];
        setMessages(updatedMessages);
    };

    return (
        <>
            <NewMessageForm addNewMessage={addNewMessage} />
            <MessageTable messages={messages} />
        </>
    );
}

export default MessageBoard;
