import mongoose from "mongoose";

const userModel = mongoose.model("user");

const registerNewUser = async (req, res) => {
  //res.status(200).send("Successful API New User POST Request");
  try {
    if (await alreadyExists(req.body.email, req,body.username)) {
        res.status(429).json({
            error: "Already Exists",
            message: "The user in the body of the Request is a duplicate."
        });
    } else {
        let user = await userModel.create(req.body);
        res.status(201).json({
            message: `Succsesfully created user: ${user}`
        });
    }
  } catch (err) {
    res.status(400).json({
      error: "Bad Request",
      message:
        "The user in the body of the Request is either missing or malformed.",
      details: err.errors || err.message,
    });
  }
};

// helper function to determine if email or username
// already exists in the DB. Returns true or false.
const alreadyExists = async (email, username) =>
  await userModel.exists({
    $or: [{ email: email }, { username: username }],
  });

export { registerNewUser };
