import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateTokens = async (user_id) => {
  const user = await User.findById(user_id);

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  if (!refreshToken || !accessToken) {
    throw new ApiError(500, "token generation failed");
  }

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  const { fullName, email, username, password } = req.body || {};
  if ([fullName, email, username, password].some((field) => !field)) {
    throw new ApiError(400, "All fields are required");
  }

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "user already registered");
  }

  const avatarLink = await uploadOnCloudinary(avatarLocalPath);
  if (!avatarLink) {
    throw new ApiError(500, "Error when getting avatarLink");
  }

  const user = await User.create({
    fullName,
    username,
    password,
    email,
    avatar: avatarLink.url,
  });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken -status",
  );

  return res.status(200).json(new ApiResponse(200, createdUser, "Success"));
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body || {};
  if (!(username || email)) {
    throw new ApiError(400, "username or email is required.");
  }

  if (!password) {
    throw new ApiError(200, "password is required.");
  }

  //find user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "user not exist.");
  }

  const varified = user.isPasswordCorrect(password);

  if (!varified) {
    throw new ApiError(400, "wrong password.");
  }
  //varified password
  const { refreshToken, accessToken } = await generateTokens(user?._id);

  const updatedUser = await User.findById(user?._id).select(
    "-password -status -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          updatedUser,
          accessToken,
          refreshToken,
        },
        "login successful",
      ),
    );
};

const logoutUser = async (req, res) => {
  //check if user login by tokens

  const user = req.user;
  //remove refresh token from db

  if (!user) {
    throw new ApiError(401, "user is not in Database");
  }

  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "success"));

  /*
  The approach is good but we need to create a middleware called Verify JWT that will get the cookies data and search on database that named by the ID is any user. Then it will go to the user and check the database user refresh token matching the web user refresh token or not. If it is matching it will send the user to respond sorry request dot user.
  */
};

const changeUserAvatar = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "user is not varified");
  }
  //take new avatar from multer
  const newAvatar = req.file;
  if (!newAvatar) {
    throw new ApiError(400, "avatar is required");
  }

  const avatarLink = await uploadOnCloudinary(newAvatar?.path);
  if (!avatarLink) {
    throw new ApiError(500, "avatar upload failed");
  }
  user.avatar = avatarLink.url;
  const newUser = await user.save({ validateBeforeSave: false });

  return res.json(new ApiResponse(200, newUser, "avatar update successful"));
};

const refreshTokens = async (req, res) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new ApiError(200, "there is no tokens");
  }

  const decoaded = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  if (!decoaded) {
    throw new ApiError(200, "token is unvalid or modified");
  }
  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await generateTokens(decoaded?._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .cookie("refreshToken", newRefreshToken, options)
    .cookie("accessToken", newAccessToken, options)
    .json(new ApiResponse(200, {}, "successfully refresh tokens"));
};

export { registerUser, loginUser, logoutUser, changeUserAvatar, refreshTokens };
