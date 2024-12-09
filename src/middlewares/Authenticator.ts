import * as jwt from "jsonwebtoken";
import authenticationData from "../types/typeAuthenticationData";
import dotenv from "dotenv";
import { payload } from "../types/typePayload";

dotenv.config();

export class Authenticator {
  generateToken = (payload: payload): string => {
    return jwt.sign({ id: payload.userId,
      role:payload.role
     }, 
     String(process.env.JWT_KEY), 
     {expiresIn: "90m",}
    );
  };
  verifyToken = (token: string): payload => {
      const tokenData = jwt.verify(
        token,
        String(process.env.JWT_KEY)
      ) as payload;
      return tokenData;
    }
  };

