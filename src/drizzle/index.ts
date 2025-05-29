import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import schema from "./schema/index.schema";

const db = drizzle({
  schema: schema,
  connection: {
    url: process.env.DB_FILE_NAME!,
  },
});

export default db;

