import {
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { getNotes } from "./queries";
import { Button } from "~/components/ui/Button";
import CardNote from "~/components/cards/card-note";
import { Github, NotebookText, Plus } from "lucide-react";

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

export default function Index() {
  const { resourceList, success } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-2xl font-bold text-center">
        Welcome to Remix (with Vite and Cloudflare)
      </h1>
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
          <Button className="px-2 py-1 flex items-center gap-[2px]">
            Add Note
            <Plus className="h-4 w-4" />
          </Button>
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
