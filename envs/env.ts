import { z } from "zod";

export const EnvSchema = z.object({
  MY_KV: z.string().min(1),
});
