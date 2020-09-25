import * as jsonwebtoken from "jsonwebtoken";
import { Payload } from "../interface/payload.interface";
const GenerateJwt = (userName: string): string => {
  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  });
  const overTime = 60;
  const privateKey = process.env.SECRET_KEY;
  const payload: Payload = {
    iss: "admin",
    sub: userName,
    admin: userName === "admin",
  };
  const token = jsonwebtoken.sign(payload, privateKey, {
    expiresIn: overTime,
  });
  return token;
};

export default GenerateJwt;
