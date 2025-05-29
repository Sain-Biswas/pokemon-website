import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { versionGroupSchema } from "./version-group.schema";
import { movesSchema } from "./moves.schema";
import { relations } from "drizzle-orm";

export const movesOnEffectChangesSchema = sqliteTable(
  "MOVES_ON_EFFECT_CHANGES",
  {
    versionGroupReference: text("VERSION_GROUP_REFERENCE").references(
      () => versionGroupSchema.id
    ),
    moveReference: text("MOVE_REFERENCE").references(() => movesSchema.id),
    effect: text("EFFECT"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.moveReference, t.versionGroupReference] }),
  })
);

export const movesOnEffectChangesRelations = relations(
  movesOnEffectChangesSchema,
  ({ one }) => ({
    versionGroup: one(versionGroupSchema, {
      fields: [movesOnEffectChangesSchema.versionGroupReference],
      references: [versionGroupSchema.id],
    }),
    move: one(movesSchema, {
      fields: [movesOnEffectChangesSchema.moveReference],
      references: [movesSchema.id],
    }),
  })
);

