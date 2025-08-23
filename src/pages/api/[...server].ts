import server from "@server/index.server";
import type { APIRoute } from "astro";

export const prerender = false;

export const ALL: APIRoute = ({request}) => server.handle(request)
