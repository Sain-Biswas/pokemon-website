import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { abilitySchema } from "./ability.schema";
import { versionGroupSchema } from "./version-group.schema";
import { relations } from "drizzle-orm";

export const abilityOnFlavorTextSchema = sqliteTable(
  "ABILITY_ON_FLAVOR_TEXT",
  {
    abilityReference: text("ABILITY_REFERENCE").references(
      () => abilitySchema.id
    ),
    versionGroupReference: text("VERSION_GROUP_REFERENCE").references(
      () => versionGroupSchema.id
    ),
    flavorText: text("FLAVOR_TEXT"),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.abilityReference, t.versionGroupReference, t.flavorText],
    }),
  })
);

export const abilityOnFlavorTextRelations = relations(
  abilityOnFlavorTextSchema,
  ({ one }) => ({
    ability: one(abilitySchema, {
      fields: [abilityOnFlavorTextSchema.abilityReference],
      references: [abilitySchema.id],
    }),
    versionGroup: one(versionGroupSchema, {
      fields: [abilityOnFlavorTextSchema.versionGroupReference],
      references: [versionGroupSchema.id],
    }),
  })
);

