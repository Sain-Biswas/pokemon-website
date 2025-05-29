import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contestTypeSchema = sqliteTable("CONTEST_TYPE", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  color: text("COLOR"),
  berryFlavor: text("BERRY_FLAVOR"),
});

