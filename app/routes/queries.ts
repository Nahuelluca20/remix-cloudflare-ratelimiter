import { note } from "db/schemas/note";
import { drizzle } from "drizzle-orm/d1";

type note = {
  title: string;
  content: string;
  description: string;
  tags: string;
};

export async function getNotes(env: D1Database) {
  const db = drizzle(env);
  const result = await db
    .select({
      id: note.id,
      title: note.title,
      content: note.content,
      description: note.description,
      tags: note.tags,
    })
    .from(note);

  return result;
}

export async function postNote(env: D1Database, data: note) {
  const db = drizzle(env);
  const result = await db.insert(note).values(data);

  return result;
}
