import BASE_PATH from "../constant/base-path";
import createOpenAPIRoute from "./create-route";

export default function createOpenAPIApp() {
  const app = createOpenAPIRoute().basePath(BASE_PATH);

  return app;
}
