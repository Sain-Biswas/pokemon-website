import type { APIRoute } from "astro";
import app from "../../server/index.server";

export const prerender = false;

export const ALL: APIRoute = (context) => app.fetch(context.request);
