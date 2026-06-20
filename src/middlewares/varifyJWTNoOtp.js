import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const varifyJWTNoOtp = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "no accessToken to verify"));
  }

  let decoaded;
  try {
    decoaded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "invalid or expired token"));
  }

  if (!decoaded) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "cant get payload when verifying"));
  }

  const user = await User.findById(decoaded._id).select("-password -status");
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "user not found in DB when verifying"));
  }

  req.user = user;
  next();
};

export default varifyJWTNoOtp;
