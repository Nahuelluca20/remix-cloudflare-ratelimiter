import {
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getNotes } from "./queries";
import { Button } from "~/Button";
import CardNote from "~/components/cards/card-note";

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

  console.log(success);

  const resourceList = !success ? [] : await getNotes(DB);

  return json({
    success,
    resourceList,
  });
}

export default function Index() {
  const { resourceList, success } = useLoaderData<typeof loader>();

  console.log(resourceList);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-red-600">
        Welcome to Remix (with Vite and Cloudflare)
      </h1>
      <Button isDisabled variant="primary">
        Get Notes
      </Button>
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
      {!success && <p>429 Failure – you exceeded rate limit</p>}
    </div>
  );
}
