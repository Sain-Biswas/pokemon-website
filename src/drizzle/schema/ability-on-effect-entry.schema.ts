import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { abilitySchema } from "./ability.schema";
import { versionGroupSchema } from "./version-group.schema";
import { relations } from "drizzle-orm";

export const abilityOnEffectEntrySchema = sqliteTable(
  "ABILITY_ON_EFFECT_ENTRY",
  {
    abilityReference: text("ABILITY_REFERENCE").references(
      () => abilitySchema.id
    ),
    versionGroupReference: text("VERSION_GROUP_REFERENCE").references(
      () => versionGroupSchema.id
    ),
    entry: text("ENTRY"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.abilityReference, t.versionGroupReference] }),
  })
);

export const abilityOnEffectEntryRelations = relations(
  abilityOnEffectEntrySchema,
  ({ one }) => ({
    ability: one(abilitySchema, {
      fields: [abilityOnEffectEntrySchema.abilityReference],
      references: [abilitySchema.id],
    }),
    versionGroup: one(versionGroupSchema, {
      fields: [abilityOnEffectEntrySchema.versionGroupReference],
      references: [versionGroupSchema.id],
    }),
  })
);

