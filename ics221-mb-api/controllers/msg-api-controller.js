//import messageSchema from "../models/message-schema.js";
import mongoose from 'mongoose';

const messageModel = mongoose.model('message');

// const messages = [
//   { id: 5, name: "Bill", msgText: "Hi All!" },
//   { id: 4, name: "Ann", msgText: "ICS 221 is fun!" },
//   { id: 3, name: "Johnny", msgText: "I'm stranded!" },
//   { id: 2, name: "Barb", msgText: "Hi" },
//   { id: 1, name: "Frank", msgText: "Who's tired?" },
//   { id: 0, name: "Sarah", msgText: "I heart React" },
// ];

// GET Request Handler
const getAllMessages = async (req, res) => {
  try {
    let messages = await messageModel.find( {}, '', { sort: { _id: -1 } } ).exec();
    res.status(200).json(messages);
  } catch {
    res.status(400).send("Bad Request");
  }
};

const getNextId = () => {
  if (messages.length === 0) return 0;
  return Math.max(...messages.map((message) => message.id)) + 1;
};

// POST Request Handler
const addNewMessage = async (req, res) => {
  try {
    let message = await messageSchema.validate(req.body);
    message.id = getNextId(); // Get unique ID for message
    messages.unshift(message); // Add to top of array
    res.status(201).json(message); // Return the new message
  } catch (err) {
    res.status(400).json({
      error: "Bad Request",
      message:
        "The message in the body of the Request is either missing or malformed.",
      details: err.errors || err.message,
    });
  }
};

export { getAllMessages, addNewMessage };
