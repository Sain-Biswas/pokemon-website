import type { ErrorHandler } from "hono";

const routerErrorHandler: ErrorHandler = (_error, c) =>
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

export default routerErrorHandler;
