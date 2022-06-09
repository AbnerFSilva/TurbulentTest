import { CronJob } from "cron";
import moment = require("moment");
import di from "../di";

export const notifyUsers = (clients: any) => {
  return new CronJob(
    di.env.CRON_MESSAGE_JOB,
    async () => {
      const data = await di.messageService.getAllMessages();
      const date = moment().format("YYYY/DD/MM HH:mm");

      const alert = data.messages.filter((msg) => {
        return msg.date === date;
      });

      di.messageService.alertUsers(alert, clients);
    },
    null,
    true,
    "America/New_York"
  );
};
