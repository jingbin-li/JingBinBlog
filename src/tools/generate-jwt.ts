import * as jsonwebtoken from "jsonwebtoken";
import { Payload } from "../interface/payload.interface";
const GenerateJwt = (userName: string): string => {
  console.log(userName);

  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
  });
  const currentTime = new Date().getTime();
  const overTime = 60 * 60 * 60;
  const privateKey = process.env.SECRET_KEY;
  const payload: Payload = {
    iss: "admin",
    iat: currentTime,
    sub: userName,
  };
  const token = jsonwebtoken.sign(
    payload,
    privateKey,
    {
      expiresIn: overTime,
    },
  );
  return token;
};

export default GenerateJwt;
