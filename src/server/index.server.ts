import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { routerErrorHandler, routerNotFoundHandler } from "./default.handler";

const app = new OpenAPIHono({ strict: false })
  .basePath("/api")
  .openapi(
    createRoute({
      method: "get",
      path: "/",
      responses: {
        200: {
          content: {
            "application/json": {
              schema: z.object({
                status: z.string(),
                success: z.boolean(),
                api_reference: z.string().url(),
                message: z.string(),
              }),
              example: {
                status: "working",
                success: true,
                message:
                  "Welcome to WebDex - Api, You can get all pokemon data you want using our RESTApi",
                api_reference: "/api/reference",
              },
            },
          },
          description:
            "Home route - Used to check if Api service is available.",
        },
        500: {
          content: {
            "application/json": {
              example: {
                success: false,
                error: {
                  message: "Something went wrong",
                  detail:
                    "Server returned an unexpected error, Try again after some time.",
                  name: "SERVER_ERROR",
                },
                code: "INTERNAL_SERVER_ERROR",
                timestamp: "2025-05-29T09:53:08.060Z",
                path: "/",
              },
              schema: z.object({
                success: z.boolean(),
                error: z.object({
                  message: z.string(),
                  detail: z.string(),
                  name: z.string(),
                }),
                code: z.string(),
                timestamp: z.date(),
                path: z.string().url(),
              }),
            },
          },
          description: "Response in case of server error.",
        },
      },
    }),
    (c) => {
      return c.json(
        {
          status: "working",
          success: true,
          message:
            "Welcome to WebDex - Api, You can get all pokemon data you want using our RESTApi",
          api_reference: "/api/reference",
        },
        200
      );
    }
  )
  .doc("/doc", {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "WebDex-Api",
    },
  })
  .get("/reference", Scalar({ url: "/api/doc", theme: "deepSpace" }));

app.notFound(routerNotFoundHandler).onError(routerErrorHandler);

export default app;
