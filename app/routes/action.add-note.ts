import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { getValidatedFormData } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const noteSchema = zod.object({
  title: zod.string().min(1).max(20),
  content: zod.string().email().min(1).max(60),
  description: zod.string().min(1).max(30),
  tags: zod.string().min(1).max(30),
});

type FormData = zod.infer<typeof noteSchema>;

const resolver = zodResolver(noteSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    // The keys "errors" and "defaultValue" are picked up automatically by useRemixForm
    return json({ errors, defaultValues });
  }

  // Do something with the data
  return json(data);
};
