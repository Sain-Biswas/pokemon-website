import type { TOpenAPIHono } from "../types/hono-open-api";
import routerErrorHandler from "./route-error.handler";
import routerNotFoundHandler from "./route-not-found.handler";

export default function configureDefaultHandlers(app: TOpenAPIHono) {
  app.notFound(routerNotFoundHandler);
  app.onError(routerErrorHandler);
}
