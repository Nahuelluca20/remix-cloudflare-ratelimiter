import { note } from "db/schemas/note";
import { drizzle } from "drizzle-orm/d1";

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
