import { CronJob } from "cron";
import di from "../di";

export const notifyUsers = () => {
  return new CronJob(
    di.env.CRON_MESSAGE_JOB,
    async () => {
      const messages = await di.messageService.getMessagesByDate();
      console.log("messages are here");
    },
    null,
    true,
    "America/New_York"
  );
};
