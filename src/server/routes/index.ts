import type { TOpenAPIHono } from "../types/hono-open-api";
import homeRoute from "./index.route";
import pokemonRoute from "./pokemon.route";

export default function registerOpenAPIRoutes(app: TOpenAPIHono) {
  return app.route("/", homeRoute).route("/pokemon", pokemonRoute);
}
