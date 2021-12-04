import { greeting } from "./resolvers/greeting";
import { logIn } from "./resolvers/logIn";

// query resolvers
export const Query = {
  greeting,
  logIn,
};
