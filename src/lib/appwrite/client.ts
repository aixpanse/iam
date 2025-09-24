import { Client } from "node-appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "";
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? "";
const key = process.env.NEXT_APPWRITE_KEY ?? "";

export const client = new Client().setEndpoint(endpoint).setProject(project);

export const adminClient = new Client()
  .setEndpoint(endpoint)
  .setProject(project)
  .setKey(key);
