import * as jsonwebtoken from "jsonwebtoken";
import { Payload } from "../interface/payload.interface";
import { Roles } from "../models/Roles.schema";
import { Users } from "../models/Users.schema";
const GenerateJwt = async (userName: string): Promise<string> => {
  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  });
  const overTime = 60*60*60*1000;
  const privateKey = process.env.SECRET_KEY;
  const result = await Users.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "_id",
        foreignField: "userId",
        as: "role",
      },
    },
    {
      $match: {
        userName,
      },
    },
  ]);
  const userRole = result[0].role[0].role;
  const payload: Payload = {
    iss: "admin",
    sub: userName,
    role: userRole,
  };
  const token = jsonwebtoken.sign(payload, privateKey, {
    expiresIn: overTime,
  });
  return token;
};

export default GenerateJwt;
