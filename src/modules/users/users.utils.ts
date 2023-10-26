import jwt from "jsonwebtoken";
import { JWT_TOKEN_EXPIRY } from "../../config/config.js";

type EncodedData = {
  [key: string]: string;
};

function jwtEncode(data: EncodedData) {
  const token = jwt.sign({ ...data }, process.env.JWT_SECRET_KEY, {
    expiresIn: JWT_TOKEN_EXPIRY,
  });

  return token;
}

function jwtDecode(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  return decoded as any;
}

function generateOTP() {
  const length = 6;
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
}

export { jwtEncode, jwtDecode, generateOTP };
