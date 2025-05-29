import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { movesSchema } from "./moves.schema";

export const moveTargetSchema = sqliteTable("MOVE_TARGET", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  descriptions: text("DESCRIPTIONS"),
  name: text("NAME"),
});

export const moveTargetRelations = relations(moveTargetSchema, ({ many }) => ({
  moves: many(movesSchema),
}));

