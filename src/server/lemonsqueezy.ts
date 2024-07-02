import axios from "axios";
import { env } from "~/env";

export const lemonSqueezyApi = axios.create({
  baseURL: "https://api.lemonsqueezy.com/v1/",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
  },
});
