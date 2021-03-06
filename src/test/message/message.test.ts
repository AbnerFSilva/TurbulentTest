import { messageResponse } from "./../../model/message";
import di from "../../di";
import HttpStatusCode from "../../enum/HttpStatusCode";
import { messageInput } from "../../model/message";
import { expect } from "chai";
const uuid = require("uuid");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
before((done) => {
  di.db.initialize();
  done();
});
describe("POST methods", function () {
  it("Should post a new message", (done) => {
    const message: messageInput = {
      message: "This is a test message!",
      date: "2022-12-12 10:30:00",
    };
    chai
      .request(server)
      .post("/create_message")
      .set("content-type", "application/x-www-form-urlencoded")
      .send(message)
      .end(function (error: any, response: any) {
        if (error) {
          done(error);
        } else {
          expect(response)
            .to.have.property("status")
            .to.be.eq(HttpStatusCode.OK);

          expect(response.body).to.have.property("id");
          done();
        }
      });
  });
  it("Should not post a new message without message field", (done) => {
    const message: messageInput = {
      message: null,
      date: "2022-12-12 10:30:00",
    };
    chai
      .request(server)
      .post("/create_message")
      .set("content-type", "application/x-www-form-urlencoded")
      .send(message)
      .end(function (error: any, response: any) {
        if (error) {
          done(error);
        } else {
          expect(response)
            .to.have.property("status")
            .to.be.eq(HttpStatusCode.BAD_REQUEST);

          expect(response.body).to.have.property("errorMessage");
          done();
        }
      });
  });
  it("Should not post a new message without date field", (done) => {
    const message: messageInput = {
      message: "test message",
      date: undefined,
    };
    chai
      .request(server)
      .post("/create_message")
      .set("content-type", "application/x-www-form-urlencoded")
      .send(message)
      .end(function (error: any, response: any) {
        if (error) {
          done(error);
        } else {
          expect(response)
            .to.have.property("status")
            .to.be.eq(HttpStatusCode.BAD_REQUEST);

          expect(response.body).to.have.property("errorMessage");
          done();
        }
      });
  });
});

describe("GET methods", function () {
  it("Should get all messages", (done) => {
    chai
      .request(server)
      .get("/get_messages")
      .set("content-type", "application/x-www-form-urlencoded")
      .end(function (error: any, response: any) {
        if (error) {
          done(error);
        } else {
          expect(response)
            .to.have.property("status")
            .to.be.eq(HttpStatusCode.OK);
          expect(response.body).to.have.property("messages");
          done();
        }
      });
  });
  it("Should get message by id", async () => {
    const messages: messageResponse = await di.messageService.getAllMessages();
    chai
      .request(server)
      .get(`/get_message/${messages.messages[0].id}`)
      .end((error: any, response: any) => {
        expect(response).to.have.property("status").to.be.eq(HttpStatusCode.OK);
        expect(response.body).to.have.property("messages");
      });
  });
  it("Should not get message using invalid id", () => {
    const messageId = uuid.v4();
    chai
      .request(server)
      .get(`/get_message/${messageId}`)
      .end((error: any, response: any) => {
        expect(response).to.have.property("status").to.be.eq(HttpStatusCode.OK);
        expect(response.body).to.have.property("errorMessage");
      });
  });
  it("Should delete message by id", async () => {
    const message: messageInput = {
      message: "This is a test message!",
      date: "2022-12-12 10:30:00",
    };
    await di.messageService.createMessage(message);
    chai
      .request(server)
      .delete(`/delete_message/${message.id}`)
      .end((error: any, response: any) => {
        expect(response).to.have.property("status").to.be.eq(HttpStatusCode.OK);
      });
  });
});
