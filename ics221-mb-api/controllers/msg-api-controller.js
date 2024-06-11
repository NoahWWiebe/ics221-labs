const [messages, setMessages] = useState([
  { id: 0, name: "Bill", msgText: "Hi All!" },
  { id: 1, name: "Ann", msgText: "ICS 221 is fun!" },
  { id: 2, name: "Johnny", msgText: "I'm stranded!" },
  { id: 3, name: "Barb", msgText: "Hi" },
  { id: 4, name: "Frank", msgText: "Who's tired?" },
  { id: 5, name: "Sarah", msgText: "I heart React" },
]);

// GET Request Handler
const getAllMessages = (req, res) => {
  res.status(200).json(messages);
};

// POST Request Handler
const addNewMessage = async (req, res) => {
  res.status(200).send("Successful API POST Request");
};
export { getAllMessages, addNewMessage };
