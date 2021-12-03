import { FieldResolver } from "../../../../../types";

export const greeting: FieldResolver = (_parent, _args, _context) => {
  return { value: "Hello, world!" };
};
