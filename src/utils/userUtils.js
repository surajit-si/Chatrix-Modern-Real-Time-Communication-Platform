import jwt from "jsonwebtoken";
import cookie from "cookie";

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
    return payload?._id;
  } catch (err) {
    return null;
  }
};

export { getUserId };
