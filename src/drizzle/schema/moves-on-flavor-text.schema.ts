import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { versionGroupSchema } from "./version-group.schema";
import { movesSchema } from "./moves.schema";
import { relations } from "drizzle-orm";

export const movesOnFlavorTextSchema = sqliteTable("MOVES_ON_FLAVOR_TEXT", {
  versionGroupReference: text("VERSION_GROUP_REFERENCE").references(
    () => versionGroupSchema.id
  ),
  moveReference: text("MOVE_REFERENCE").references(() => movesSchema.id),
  flavorText: text("FLAVOR_TEXT"),
});

export const movesOnFlavorTextRelations = relations(
  movesOnFlavorTextSchema,
  ({ one }) => ({
    versionGroup: one(versionGroupSchema, {
      fields: [movesOnFlavorTextSchema.versionGroupReference],
      references: [versionGroupSchema.id],
    }),
    move: one(movesSchema, {
      fields: [movesOnFlavorTextSchema.moveReference],
      references: [movesSchema.id],
    }),
  })
);
