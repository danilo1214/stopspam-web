import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env";
import { Instagram } from "~/server/api/services/instagram";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.headers.authorization?.split("Bearer ")[1] === env.CRON_SECRET) {
    console.log("getting fb accounts");
    await new Instagram().replyToComments();

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
