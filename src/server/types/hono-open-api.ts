import type { OpenAPIHono } from "@hono/zod-openapi";
import type { TEnvironmentVariables } from "../../constant/env";
import type { TBASE_PATH } from "../constant/base-path";
import type { TDatabase } from "../../drizzle";

export interface IAppBindings {
  Bindings: TEnvironmentVariables;
  Variables: {
    database: TDatabase;
  };
}

export type TOpenAPIHono = OpenAPIHono<IAppBindings, {}, TBASE_PATH>;
