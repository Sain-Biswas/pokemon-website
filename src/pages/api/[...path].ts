import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import type { APIRoute } from "astro";

export const prerender = false;

const app = new OpenAPIHono({ strict: false }).basePath("/api").openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Working",
      },
    },
  }),
  (c) => {
    return c.json({ message: "Hello World!" }, 200);
  }
);

app.doc("/doc", {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "WebDex-Api",
  },
});

app.get("/reference", Scalar({ url: "/api/doc", theme: "deepSpace" }));

export const ALL: APIRoute = (context) => app.fetch(context.request);
