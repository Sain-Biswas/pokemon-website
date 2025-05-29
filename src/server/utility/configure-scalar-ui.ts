import { Scalar } from "@scalar/hono-api-reference";
import type { TOpenAPIHono } from "../types/hono-open-api";

export default function configureScalarUI(app: TOpenAPIHono) {
  app
    .doc("/doc", {
      openapi: "3.0.1",
      info: {
        version: "1.0.0",
        title: "WebDex Api",
      },
    })
    .get("/reference", Scalar({ url: "/api/doc", theme: "deepSpace" }));
}
