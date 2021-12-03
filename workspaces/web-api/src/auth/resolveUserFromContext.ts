import { ExpressContext } from "apollo-server-express";
import { getKnex } from "../db/connection";
import { UserRecord } from "../db/types";
import { decodedToken } from "./decodedToken";

// resolve the user who made a graphql request
export const resolveUserFromContext = async (context: ExpressContext) => {
  let user: UserRecord | undefined = undefined;
  const knex = getKnex();

  const userToken = decodedToken(context.req, process.env.WEB_API_JWT_SECRET);

  if (userToken?.id && userToken.pwHash) {
    const userRows = await knex("users")
      .where("id", "=", userToken.id)
      .where("email", "=", userToken.email)
      .where("password", "=", userToken.pwHash)
      .where("is_active", "=", true)
      .limit(1);

    if (userRows.length) {
      user = userRows[0];
    }
  }

  return user;
};
