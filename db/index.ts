import { drizzle } from "drizzle-orm/d1";
import * as noteSchema from "./schemas/note";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const db = async ({ context }: LoaderFunctionArgs) => {
  const database = drizzle(context.cloudflare.env.DB, {
    schema: { ...noteSchema },
  });
  return database;
};
