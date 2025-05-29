import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { regionSchema } from "./region.schema";
import { versionGroupSchema } from "./version-group.schema";
import { relations } from "drizzle-orm";

export const regionOnVersionGroupSchema = sqliteTable(
  "REGION_ON_VERSION_GROUP",
  {
    regionReference: text("REGION_REFERENCE").references(() => regionSchema.id),
    versionGroupReference: text("VERSION_GROUP_REFERENCE").references(
      () => versionGroupSchema.id,
    ),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.regionReference, t.versionGroupReference] }),
  }),
);

export const regionOnVersionGroupRelations = relations(
  regionOnVersionGroupSchema,
  ({ one }) => ({
    region: one(regionSchema, {
      fields: [regionOnVersionGroupSchema.regionReference],
      references: [regionSchema.id],
    }),
    versionGroup: one(versionGroupSchema, {
      fields: [regionOnVersionGroupSchema.versionGroupReference],
      references: [versionGroupSchema.id],
    }),
  }),
);
