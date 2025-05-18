import AWS from "aws-sdk";
import { env } from "~/env";

AWS.config.update({ region: "us-east-1" });
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

export async function sendMessageToQueue(messageBody: object) {
  return new Promise((resolve, reject) => {
    try {
      sqs.sendMessage(
        {
          QueueUrl: env.AWS_QUEUE_URL,
          MessageBody: JSON.stringify(messageBody),
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }

          console.log("sqs message sent", messageBody);
          return resolve(data);
        },
      );
    } catch (err) {
      reject(err);
      console.error("Error sending message:", err);
    }
  });
}
