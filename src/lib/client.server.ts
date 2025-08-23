import { treaty } from "@elysiajs/eden";
import server from "@server/index.server";


const client = treaty(server).api;

export default client;
