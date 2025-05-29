import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { moveDamageClassSchema } from "./move-damage-class.schema";
import { relations } from "drizzle-orm";
import { typeOnPokemonSchema } from "./type-on-pokemon.schema";
import { movesSchema } from "./moves.schema";

export const typeSchema = sqliteTable("TYPE", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  moveDamageClassReference: text("MOVE_DAMAGE_CLASS_REFERENCE").references(
    () => moveDamageClassSchema.id,
  ),
  damageRelations: text("DAMAGE_RELATIONS", { mode: "json" }).$type<{
    halfDamageFrom: string[];
    halfDamageTo: string[];
    doubleDamageFrom: string[];
    doubleDamageTo: string[];
    noDamageFrom: string[];
    noDamageTo: string[];
  }>(),
});

export const typeRelations = relations(typeSchema, ({ one, many }) => ({
  moveDamageClass: one(moveDamageClassSchema, {
    fields: [typeSchema.moveDamageClassReference],
    references: [moveDamageClassSchema.id],
  }),
  moves: many(movesSchema),
  pokemons: many(typeOnPokemonSchema),
}));
