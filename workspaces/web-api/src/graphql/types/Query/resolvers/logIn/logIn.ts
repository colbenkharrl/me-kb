import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server-errors";
import { UserRecord } from "../../../../../db/types";
import { FieldResolver } from "../../../../../types";

export const logIn: FieldResolver = async (_, args, context) => {
  const {
    credentials: { email, pw },
  } = args;
  const { knex, req } = context;

  if (!process.env.WEB_API_JWT_SECRET || !req.session) {
    throw new Error("Auth tokens misconfigured.");
  }

  const [user]: UserRecord[] = await knex("users")
    .where("users.email", "=", email)
    .where("users.is_active", "=", true)
    .limit(1);

  if (!user) {
    // no user exists with email
    throw new AuthenticationError("Invalid login.");
  }

  const matched = bcrypt.compareSync(pw, user.pw_hash);

  if (matched) {
    const token = jwt.sign(user, process.env.WEB_API_JWT_SECRET, {
      expiresIn: 60 * 60 * 24, // expires after one day
    });
    req.session.token = token;
    return {
      user,
      token,
    };
  } else {
    // password was incorrect
    throw new AuthenticationError("Invalid login.");
  }
};
