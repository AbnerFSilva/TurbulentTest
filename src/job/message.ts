import { CronJob } from "cron";
import moment = require("moment");
import di from "../di";

export const notifyUsers = (sockets: any[]) => {
  return new CronJob(
    di.env.CRON_MESSAGE_JOB,
    async () => {
      const data = await di.messageService.getAllMessages();
      const date = moment().toDate();
      const abner = moment().format("yyyy-dd-mm hh:mm");

      const alert = data.messages.filter((msg) => {
        return msg.date === abner;
      });

      di.messageService.alertUsers(alert, sockets);
    },
    null,
    true,
    "America/New_York"
  );
};
