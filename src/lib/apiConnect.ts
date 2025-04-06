import { Client } from "clashofclans.js";

export let client: Client;

export const connectToApi = async () => {
  try {
    const email = process.env?.COC_EMAIL;
    const password = process.env?.COC_PASSWORD;
    if (!email || !password) {
      throw new Error("Clash of Clans credentials not found");
    }
    if (!client) client = new Client();
    await client.login({ email, password });
  } catch (error: any) {
    console.log(error);
  }
};