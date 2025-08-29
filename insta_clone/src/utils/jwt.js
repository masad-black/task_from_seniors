import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.JWT_PRIVATE_KEY;

function generateJwtToken(payload) {
  return jwt.sign(payload, privateKey, {
    expiresIn: "10h", // valid for 1 hour
  });
}

function verifyJwtToken(token) {
  return jwt.verify(token, privateKey, (err, decode) => {
    if (err) return false;
  });
}

function decodeJwtToken(token) {
  return jwt.decode(token);
}

export { generateJwtToken, verifyJwtToken, decodeJwtToken };
