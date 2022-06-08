import { errorMessage } from "./../model/error";
import { messageInput } from "./../model/message";
import express = require("express");
import di from "../di";
import ErrorCode from "../enum/ErrorCodes";
import HttpStatusCode from "../enum/HttpStatusCode";
const router = express.Router();

router.post("/create_message", async (req, res, context) => {
  console.log("controler");

  const message: messageInput = req.body;
  const response = await di.messageService.createMessage(message);
  console.log("controler2");

  if (!response.id) {
    const error: errorMessage = {
      errorMessage: ErrorCode.FIELDS_MISSING,
      date: new Date(),
    };
    res.json(error).status(HttpStatusCode.BAD_REQUEST);
  }
  res.json(response).status(HttpStatusCode.OK);
});

export { router as messageRoute };
