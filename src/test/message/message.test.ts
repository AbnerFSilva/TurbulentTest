import HttpStatusCode from "../../enum/HttpStatusCode";
import { messageInput } from "../../model/message";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Post methods", function () {
  it("Should post a new message", (done) => {
    const message: messageInput = {
      message: "This is a test message!",
      date: new Date(Date.now()),
    };
    chai
      .request(server)
      .post("/create_message")
      .send(message)
      .end(function (error: any, response: any, body: any) {
        if (error) {
          done(error);
        } else {
          expect(response).to.have.status(HttpStatusCode.OK);
          expect(body).to.exist;
          console.log(body);
          done();
        }
      });
  });
});
