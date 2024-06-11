import messageSchema from "../models/message-schema.js";

const messages = [
  { id: 5, name: "Bill", msgText: "Hi All!" },
  { id: 4, name: "Ann", msgText: "ICS 221 is fun!" },
  { id: 3, name: "Johnny", msgText: "I'm stranded!" },
  { id: 2, name: "Barb", msgText: "Hi" },
  { id: 1, name: "Frank", msgText: "Who's tired?" },
  { id: 0, name: "Sarah", msgText: "I heart React" },
];

// GET Request Handler
const getAllMessages = (req, res) => {
  try {
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
    // TODO: add message as first element of array and
    // respond with '201 Created' Status Code and
    //the message, as JSON, in the body of the response.

    message.id = getNextId();
    messages.unshift(message);
    res.status(201).json(message);
    console.log(messages);
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
