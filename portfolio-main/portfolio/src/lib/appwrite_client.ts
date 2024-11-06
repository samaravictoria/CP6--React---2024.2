import { Client } from "appwrite";

export const client = new Client();

client
.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_ID as string)
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);