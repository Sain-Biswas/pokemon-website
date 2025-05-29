import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { movesSchema } from "./moves.schema";

export const moveDamageClassSchema = sqliteTable("MOVE_DAMAGE_CLASS", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  description: text("DESCRIPTION"),
});

export const moveDamageClassRelations = relations(
  moveDamageClassSchema,
  ({ many }) => ({
    moves: many(movesSchema),
  })
);

