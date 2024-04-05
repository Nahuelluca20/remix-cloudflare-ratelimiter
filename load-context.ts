import { type PlatformProxy } from "wrangler";
import { z } from "zod";
import { EnvSchema } from "envs/env";

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Env {}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;
export type AppEnvs = z.infer<typeof EnvSchema>;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

declare module "@remix-run/cloudflare" {
  interface LoaderFunctionArgs {
    request: Request;
    params: Params;
    context: {
      cloudflare: {
        env: AppEnvs;
      };
    };
  }
}
