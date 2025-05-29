import { drizzle } from "drizzle-orm/libsql";
import schema from "./schema/index.schema";
import environmentVariables from "../constant/env";

const database = drizzle({
  schema: schema,
  connection: {
    url: environmentVariables.DATABASE_URL,
  },
});

export default database;

export type TDatabase = typeof database;
