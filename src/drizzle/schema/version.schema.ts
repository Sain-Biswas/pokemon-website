import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { versionGroupSchema } from "./version-group.schema";
import { relations } from "drizzle-orm";

export const versionSchema = sqliteTable("VERSION", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  versionGroupReference: text("VERSION_GROUP_REFERENCE").references(
    () => versionGroupSchema.id,
  ),
});

export const versionrelations = relations(versionSchema, ({ one }) => ({
  versionGroup: one(versionGroupSchema, {
    fields: [versionSchema.versionGroupReference],
    references: [versionGroupSchema.id],
  }),
}));
