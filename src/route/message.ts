import { errorMessage } from "./../model/error";
import { messageInput } from "./../model/message";
import express = require("express");
import di from "../di";
import HttpStatusCode from "../enum/HttpStatusCode";
const router = express.Router();

router.post("/create_message", async (req, res) => {
  const message: messageInput = req.body;
  const messageValidation = di.messageService.validateMessage(message);

  if (messageValidation) {
    res.statusCode = HttpStatusCode.BAD_REQUEST;
    res.send(messageValidation);
  }

  const response = await di.messageService.createMessage(message);
  res.statusCode = HttpStatusCode.OK;
  res.send(response);
});

router.get("/get_messages", async (req, res) => {
  const messages = await di.messageService.getAllMessages();
  res.statusCode = HttpStatusCode.OK;
  res.json(messages);
});

router.get("/get_message/:id", async (req, res) => {
  const messages = await di.messageService.getMessageById(req.params.id);
  res.statusCode = HttpStatusCode.OK;
  res.json(messages);
});

router.get("/delete_message/:id", async (req, res) => {
  const messages = await di.messageService.deleteMessageById(req.params.id);
  res.statusCode = HttpStatusCode.OK;
  res.json(messages);
});

export { router as messageRoute };
