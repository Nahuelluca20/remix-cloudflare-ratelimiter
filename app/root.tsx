import { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";
import { themeSessionResolver } from "./routes/sessions.server";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
};

function App() {
  const data: {
    theme: string;
  } = useLoaderData();
  const [theme] = useTheme();
  return (
    <html lang="en" data-mode={theme ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data?.theme || "")} />
        <Meta />
        <Links />
      </head>
      <body className="max-w-[1200px] w-full mx-auto mt-20 bg-foreground">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data: {
    theme: string;
  } = useLoaderData();
  return (
    <ThemeProvider
      specifiedTheme={data.theme as Theme}
      themeAction="/action/set-theme"
    >
      <App />
    </ThemeProvider>
  );
}
