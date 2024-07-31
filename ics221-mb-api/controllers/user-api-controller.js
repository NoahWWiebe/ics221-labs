import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";

const userModel = mongoose.model("user");

const registerNewUser = async (req, res) => {
  //res.status(200).send("Successful API New User POST Request");
  try {
    if (await alreadyExists(req.body.email, req.body.username)) {
      res.status(403).json({
        error: "Already Exists",
        message: "The username or email already exists.",
      });
    } else {
      let user = await userModel.create(req.body);
      res.status(201).json({
        message: `Succsesfully created user: ${user}`,
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

passport.use(
  new LocalStrategy(async (userIdent, password, done) => {
    try {
      const user = await userModel
        .findOne({
          $or: [{ email: userIdent }, { username: userIdent }],
        })
        .exec();
      // user wasn't found
      if (!user) return done(null, false);
      // user was found, see if it's a valid password
      if (!(await user.verifyPassword(password))) {
        // password not valid
        return done(null, false);
      }
      // valid password, return user
      return done(null, user);
    } catch (error) {
      // error searching for user
      return done(error);
    }
  })
);

// Login Handler
const logInUser = (req, res) => {
  res.status(200).send("Successful API Login Request");
};

export { registerNewUser, logInUser };
