import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/secret-key";

type DecodedUser = {
  id: string;
};

export function userDecodeToken(token: string) {
  let id_user = "";

  jwt.verify(token, SECRET_KEY, async (_, decoded) => {
    const { id } = decoded as DecodedUser;

    id_user = id;
  });

  return id_user;
}
