import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const varifyJWT = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    throw new ApiError(200, "no accessToken to varify");
  }
  const decoaded = await jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
  );

  if (!decoaded) {
    throw new ApiError(200, "cant get payload when varifing");
  }

  const user = await User.findById(decoaded._id).select("-password -status");
  if (!user) {
    throw new ApiError(200, "user not found in DB when varifing");
  }

  if (!user.isVerified) {
    throw new ApiError(401, "user is not varified, please varify");
  }

  req.user = user;
  next();
};

export default varifyJWT;
