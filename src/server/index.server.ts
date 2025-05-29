import { createRoute, z } from "@hono/zod-openapi";
import HTTPStatusCodes from "./constant/http-status-codes";
import createOpenAPIApp from "./lib/create-app";
import configureDefaultHandlers from "./utility/configure-default-handlers";
import configureScalarUI from "./utility/configure-scalar-ui";
import registerOpenAPIRoutes from "./routes";

const app = registerOpenAPIRoutes(createOpenAPIApp());

configureDefaultHandlers(app);

configureScalarUI(app);

export default app;
