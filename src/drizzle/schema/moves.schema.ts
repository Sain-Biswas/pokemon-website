import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generationSchema } from "./generation.schema";
import { typeSchema } from "./type.schema";
import { moveTargetSchema } from "./move-target.schema";
import { contestEffectSchema } from "./contest-effect.schema";
import { contestTypeSchema } from "./contest-type.schema";
import { moveDamageClassSchema } from "./move-damage-class.schema";
import { moveAilmentSchema } from "./move-ailment.schema";
import { relations } from "drizzle-orm";
import { movesOnPokemonSchema } from "./moves-on-pokemon.schema";
import { movesOnEffectChangesSchema } from "./moves-on-effect-changes.schema";
import { movesOnFlavorTextSchema } from "./moves-on-flavor-text.schema";

export const movesSchema = sqliteTable("MOVES", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  generationReference: text("GENERATION_REFERENCE").references(
    () => generationSchema.id
  ),
  typeReference: text("TYPE_REFERENCE").references(() => typeSchema.id),
  moveTargetReference: text("MOVE_TARGET_REFERENCE").references(
    () => moveTargetSchema.id
  ),
  contestEffectReference: integer("CONTEST_EFFECT_REFERENCE").references(
    () => contestEffectSchema.id
  ),
  contestTypeReference: text("CONTEST_TYPE_REFERENCE").references(
    () => contestTypeSchema.id
  ),
  moveDamageClassReference: text("MOVE_DAMAGE_CLASS_REFERENCE").references(
    () => moveDamageClassSchema.id
  ),
  effectChance: integer("EFFECT_CHANCE"),
  accuracy: integer("ACCURACY"),
  effectEntry: text("EFFECT_ENTRY"),
  shortEffectEntry: text("SHORT_EFFECT_ENTRY"),
  ailmentReference: text("AILMENT_REFERENCE").references(
    () => moveAilmentSchema.id
  ),
  power: integer("POWER"),
  pp: integer("PP"),
  statChanges: text("STAT_CHANGES", { mode: "json" }).$type<
    {
      stat: string;
      change: number;
    }[]
  >(),
});

export const movesRelations = relations(movesSchema, ({ one, many }) => ({
  ailment: one(moveAilmentSchema, {
    fields: [movesSchema.ailmentReference],
    references: [moveAilmentSchema.id],
  }),
  moveDamageClass: one(moveDamageClassSchema, {
    fields: [movesSchema.moveDamageClassReference],
    references: [moveDamageClassSchema.id],
  }),
  contestEffect: one(contestEffectSchema, {
    fields: [movesSchema.contestEffectReference],
    references: [contestEffectSchema.id],
  }),
  contestType: one(contestTypeSchema, {
    fields: [movesSchema.contestTypeReference],
    references: [contestTypeSchema.id],
  }),
  target: one(moveTargetSchema, {
    fields: [movesSchema.moveTargetReference],
    references: [moveTargetSchema.id],
  }),
  type: one(typeSchema, {
    fields: [movesSchema.typeReference],
    references: [typeSchema.id],
  }),
  generation: one(generationSchema, {
    fields: [movesSchema.generationReference],
    references: [generationSchema.id],
  }),
  pokemons: many(movesOnPokemonSchema),
  effectChanges: many(movesOnEffectChangesSchema),
  flavorText: many(movesOnFlavorTextSchema),
}));

