import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { getNotes } from "./queries";
import { Button } from "~/components/ui/Button";
import CardNote from "~/components/cards/card-note";
import { Github, NotebookText } from "lucide-react";
import { Heading } from "react-aria-components";
import AddNote from "~/components/modals/add-note";
import { getValidatedFormData } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

export const meta: MetaFunction = () => {
  return [
    { title: "Cloudflare + Remix" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url);
  const { MY_RATE_LIMITER, DB } = context.cloudflare.env;

  const { success } = await MY_RATE_LIMITER.limit({
    key: pathname,
  });

  const resourceList = !success ? [] : await getNotes(DB);

  return json({
    success,
    resourceList,
  });
}

const noteSchema = zod.object({
  title: zod.string().min(1).max(20),
  content: zod.string().min(1).max(60),
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

export default function Index() {
  const { resourceList, success } = useLoaderData<typeof loader>();
  const data = useActionData();
  console.log("action data:", data);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Heading className="text-2xl font-bold text-center">
        Welcome to Remix (with Vite and Cloudflare)
      </Heading>
      <div className="gap-2 justify-center flex w-full mt-4">
        <Link to={"https://nahuel-dev.pages.dev/blog"} target="__blanck">
          <Button
            className="flex items-center gap-1 py-1 px-2"
            variant="primary"
          >
            <NotebookText className="h-4 w-4" />
            View Blog
          </Button>
        </Link>
        <Link to={"https://github.com/Nahuelluca20"} target="__blanck">
          <Button
            variant="secondary"
            className="flex items-center gap-1 py-1 px-2"
          >
            <Github className="h-4 w-4" />
            Code
          </Button>
        </Link>
      </div>
      <section className="mt-10 space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-center">Notes</h2>

          <AddNote />
        </div>
        {success && resourceList.length > 0 && (
          <ul>
            {resourceList.map((note) => (
              <li key={note.id}>
                <CardNote
                  title={note.title || ""}
                  tags={note.tags || ""}
                  description={note.description || ""}
                  content={note.content || ""}
                />
              </li>
            ))}
          </ul>
        )}
        {!success && (
          <p className="text-center text-2xl font-bold text-red-500">
            429 Failure – you exceeded rate limit
          </p>
        )}
      </section>
    </div>
  );
}
