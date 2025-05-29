import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { pokemonSpeciesSchema } from "./pokemon-species.schema";
import { relations } from "drizzle-orm";

export const evolutionDetailsSchema = sqliteTable(
  "EVOLUTION_DETAILS",
  {
    id: integer("ID"),
    speciesReference: text("SPECIES_REFERENCE").references(
      () => pokemonSpeciesSchema.id
    ),
    rank: integer("RANK"),
    heldItem: text("HELD_ITEM", { mode: "json" }).$type<string[]>(),
    item: text("ITEM", { mode: "json" }).$type<string[]>(),
    knownMove: text("KNOWN_MOVE", { mode: "json" }).$type<string[]>(),
    knowMovetype: text("KNOWN_MOVE_TYPE", { mode: "json" }).$type<string[]>(),
    minLevel: integer("MIN_LEVEL"),
    needsOverworldRain: integer("NEEDS_OVERWORLD_RAIN", { mode: "boolean" }),
    partySpecies: text("PARTY_SPECIES", { mode: "json" }).$type<string[]>(),
    partytype: text("PARTY_TYPE", { mode: "json" }).$type<string[]>(),
    timeOfDay: text("TIME_OF_DAY", { mode: "json" }).$type<string[]>(),
    tradeSpecies: text("TRADE_SPECIES", { mode: "json" }).$type<string[]>(),
    trigger: text("TRIGGER", { mode: "json" }).$type<string[]>(),
    turnUpsideDown: integer("TURN_UPSIDE_DOWN", { mode: "boolean" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.id, t.speciesReference] }),
  })
);

export const evolutionDetailsrelations = relations(
  evolutionDetailsSchema,
  ({ one }) => ({
    pokemonSpecies: one(pokemonSpeciesSchema, {
      fields: [evolutionDetailsSchema.speciesReference],
      references: [pokemonSpeciesSchema.id],
    }),
  })
);

