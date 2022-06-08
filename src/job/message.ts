import { CronJob } from "cron";
import di from "../di";

export const notifyUsers = () => {
  return new CronJob(
    di.env.CRON_MESSAGE_JOB,
    async () => {
      const messages = await di.messageService.getMessagesByDate();
      if (messages.length > 0) {
        console.log("messages are here");
        console.log(messages);
      }
    },
    null,
    true,
    "America/New_York"
  );
};
