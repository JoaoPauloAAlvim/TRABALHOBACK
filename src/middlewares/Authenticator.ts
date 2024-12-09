import * as jwt from "jsonwebtoken";
import authenticationData from "../types/typeAuthenticationData";
import dotenv from "dotenv";

dotenv.config();

export class Authenticator {
  generateToken = (input: authenticationData): string => {
    return jwt.sign(input, String(process.env.JWT_KEY), { expiresIn: "1d" });
  };
  getTokenData = (token: string): authenticationData | null => {
    try {
      const { id } = jwt.verify(
        token,
        String(process.env.JWT_KEY)
      ) as authenticationData;
      return { id };
    } catch (error) {
      return null;
    }
  };
}
