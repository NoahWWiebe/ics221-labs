import React, { useState } from 'react';
import MessageTable from './MessageTable';
import NewMessageForm from './NewMessageForm';

const MessageBoard = () => {
    const [messages, setMessages] = useState([
        { id: 0, name: "Bill", msgText: "Hi All!" },
        { id: 1, name: "Ann", msgText: "ICS 221 is fun!" },
        { id: 2, name: "Johnny", msgText: "I'm stranded!" },
        { id: 3, name: "Barb", msgText: "Hi" },
        { id: 4, name: "Frank", msgText: "Who's tired?" },
        { id: 5, name: "Sarah", msgText: "I heart React" },
    ]);

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
