import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generationSchema } from "./generation.schema";
import { relations } from "drizzle-orm";
import { regionOnVersionGroupSchema } from "./region-on-version-group.schema";

export const regionSchema = sqliteTable("REGION", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  mainGenerationReference: text("MAIN_GENERATION_REFERENCE").references(
    () => generationSchema.id,
  ),
});

export const regionRelations = relations(regionSchema, ({ one, many }) => ({
  mainGeneration: one(generationSchema, {
    fields: [regionSchema.mainGenerationReference],
    references: [generationSchema.id],
  }),
  versionGroups: many(regionOnVersionGroupSchema),
}));
