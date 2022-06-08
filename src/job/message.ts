import { Message } from "./../orm/entities/Message";
import { CronJob } from "cron";
import di from "../di";

export const removeInactiveUsersRoutine = () => {
  return new CronJob(
    di.env.CRON_MESSAGE_JOB,
    async () => {
      const messages = di.messageService.getMessagesByDate();
    },
    null,
    true,
    "America/New_York"
  );
};
