import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generationSchema } from "./generation.schema";
import { relations } from "drizzle-orm";
import { versionSchema } from "./version.schema";
import { regionOnVersionGroupSchema } from "./region-on-version-group.schema";

export const versionGroupSchema = sqliteTable("VERSION_GROUP", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  generationReference: text("GENERATION_REFERENCE").references(
    () => generationSchema.id,
  ),
});

export const versionGroupRelations = relations(
  versionGroupSchema,
  ({ one, many }) => ({
    generation: one(generationSchema, {
      fields: [versionGroupSchema.generationReference],
      references: [generationSchema.id],
    }),
    versions: many(versionSchema),
    regions: many(regionOnVersionGroupSchema),
  }),
);
