const { promisify } = require("util");
// const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncWrapper = require("../middleware/async");
const { CustomApiError } = require("../error/custom-error");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

const signUp = asyncWrapper(async (req, res, next) => {
  const newUser = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  createSendToken(newUser, 201, res);
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  //check email and password exist
  if (!email || !password) {
    return next(new CustomApiError("Please provide email and password", 400));
  }

  //check if password and user is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new CustomApiError("Incorrect email and password", 401));
  }

  //if everythingok send token to client
  createSendToken(user, 200, res);
});

const protect = asyncWrapper(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new CustomApiError(
        "You are not logged in, please log in to get access",
        401
      )
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(
      new CustomApiError(
        "The user belonging to this token no longer exists",
        401
      )
    );
  }

  req.user = freshUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomApiError(
          "You do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  signUp,
  login,
  protect,
  restrictTo,
};
