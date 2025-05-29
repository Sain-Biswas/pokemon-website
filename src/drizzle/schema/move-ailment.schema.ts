import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { movesSchema } from "./moves.schema";
import { relations } from "drizzle-orm";

export const moveAilmentSchema = sqliteTable("MOVE_AILMENT", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
});

export const moveAilmentRelations = relations(
  moveAilmentSchema,
  ({ many }) => ({
    moves: many(movesSchema),
  })
);

