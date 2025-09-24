"use server";
import { Account, Models } from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_ID } from "./consts";
import { adminClient, client } from "../appwrite/client";

export async function createSessionClient(sessionSecret?: string) {
  if (!sessionSecret) {
    const session = (await cookies()).get(SESSION_ID);
    console.log("createSessionClient", session);
    if (!session || !session.value) {
      throw new Error("No session");
    }

    client.setSession(session.value);
  } else {
    client.setSession(sessionSecret as string);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  return {
    get account() {
      return new Account(adminClient);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    console.log({ account });
    return await account.get();
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}
