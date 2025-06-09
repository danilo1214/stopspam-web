import moment from "moment";
import { db } from "~/server/db";

export const getCommentsForMonth = (userId: string): Promise<number> => {
  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");
  return db.commentReply.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth.toDate(),
        lt: endOfMonth.toDate(),
      },
    },
  });
};
