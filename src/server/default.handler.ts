import type { NotFoundHandler } from "hono";
import type { ErrorHandler } from "hono";

export const routerNotFoundHandler: NotFoundHandler = (c) =>
  c.json(
    {
      success: false,
      error: {
        message: "Invalid path request - Endpoint not found",
        details: `The requested route ${c.req.path} does not exist`,
        name: "ROUTE_ERROR",
      },
      code: "NOT_FOUND",
      path: c.req.path,
    },
    404
  );

export const routerErrorHandler: ErrorHandler = (_error, c) =>
  c.json(
    {
      success: false,
      error: {
        message: "Something went wrong",
        detail:
          "Server returned an unexpected error, Try again after some time.",
        name: "SERVER_ERROR",
      },
      code: "INTERNAL_SERVER_ERROR",
      timestamp: new Date(),
      path: c.req.path,
    },
    500
  );
