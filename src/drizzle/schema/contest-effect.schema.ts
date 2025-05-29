import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contestEffectSchema = sqliteTable("CONTEST_EFFECT", {
  id: integer("ID").primaryKey(),
  effectEntry: text("EFFECT_ENTRY"),
  flavorText: text("FLAVOR_TEXT"),
  appeal: integer("APPEAL"),
});
