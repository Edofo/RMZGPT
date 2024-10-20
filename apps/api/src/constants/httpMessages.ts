import { AuthMessages } from "./authMessages";

export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const HttpMessages = {
  INVALID_CREDENTIALS: "Invalid credentials",
  ERROR_OCCURRED: "An error occurred",
  USER_NOT_FOUND: "User not found",
  UNAUTHORIZED: "Unauthorized",
  OK: "ok",
  AUTH: AuthMessages,
};
