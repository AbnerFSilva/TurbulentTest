enum ErrorCode {
  FIELDS_MISSING = "Error while add new message, the request have missing fields.",
  DATE_OLDER_THAN_TODAY = "Error while add new message, the request have missing fields.",
  DATABASE_ERROR = "There was a problem while saving the message.",
  NO_MESSAGE_FOUND = "No messages were found with this ID",
  NO_MESSAGES_FOUND = "No messages were found",
}

export default ErrorCode;
