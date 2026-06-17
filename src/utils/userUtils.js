import jwt from "jsonwebtoken";
import cookie from "cookie";
import { User } from "../models/user.model.js";
import ApiError from "./ApiError.js";

const getUserId = async (req) => {
  try {
    const { refreshToken } = cookie.parse(req.headers.cookie || "");
    if (!refreshToken) {
      return null;
    }
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!payload) {
      return null;
    }

    const user = await User.findById(payload._id);

    if (user.refreshToken != refreshToken) {
      throw new ApiError(400, "refresh token not matched");
    }

    if (!user.isVerified) {
      throw new ApiError(401, "user is not verified");
    }

    return payload?._id;
  } catch (err) {
    return null;
  }
};

export { getUserId };
