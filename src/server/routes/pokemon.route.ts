import { createRoute, z } from "@hono/zod-openapi";
import createOpenAPIRoute from "../lib/create-route";
import HTTPStatusCodes from "../constant/http-status-codes";
import database from "../../drizzle";
import { pokemonSchema } from "../../drizzle/schema/pokemon.schema";

const pokemonRoute = createOpenAPIRoute().openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      [HTTPStatusCodes.OK]: {
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              data: z.array(
                z.object({
                  id: z.string(),
                  index: z.number(),
                  name: z.string(),
                  cries: z.string().url(),
                  image: z.string().url(),
                  imageShiny: z.string().url(),
                  types: z.array(
                    z.object({
                      id: z.string(),
                      name: z.string(),
                    })
                  ),
                  species: z.object({
                    id: z.string(),
                    index: z.number(),
                    name: z.string(),
                  }),
                  genera: z.string(),
                  shape: z.string(),
                  formSwitchable: z.boolean(),
                  genderDifference: z.boolean(),
                  legendary: z.boolean(),
                  mythical: z.boolean(),
                  generation: z.object({
                    id: z.string(),
                    name: z.string(),
                  }),
                  region: z.object({
                    id: z.string(),
                    name: z.string(),
                  }),
                })
              ),
            }),
            example: {
              success: true,
              data: [
                {
                  id: "bulbasaur",
                  index: 1,
                  name: "Bulbasaur",
                  cries:
                    "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg",
                  image:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                  imageShiny:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",
                  types: [
                    {
                      name: "Grass",
                      id: "grass",
                    },
                    {
                      name: "Poison",
                      id: "poison",
                    },
                  ],
                  species: {
                    id: "bulbasaur",
                    index: 1,
                    name: "Bulbasaur",
                  },
                  genera: "Seed Pokémon",
                  shape: "Quadruped",
                  formSwitchable: false,
                  genderDifference: false,
                  legendary: false,
                  mythical: false,
                  generation: {
                    id: "generation-i",
                    name: "Generation I",
                  },
                },
              ],
            },
          },
        },
        description: "List of pokemon with some basic info on each.",
      },
      [HTTPStatusCodes.INTERNAL_SERVER_ERROR]: {
        content: {
          "application/json": {
            example: {
              success: false,
              error: {
                message: "Something went wrong",
                detail:
                  "Server returned an unexpected error, Try again after some time.",
                name: "SERVER_ERROR",
              },
              code: "INTERNAL_SERVER_ERROR",
              timestamp: "2025-05-29T09:53:08.060Z",
              path: "/",
            },
            schema: z.object({
              success: z.boolean(),
              error: z.object({
                message: z.string(),
                detail: z.string(),
                name: z.string(),
              }),
              code: z.string(),
              timestamp: z.date(),
              path: z.string().url(),
            }),
          },
        },
        description: "Response in case of server error.",
      },
    },
  }),
  async (c) => {
    const query = await database.query.pokemonSchema.findMany({
      columns: {
        name: true,
        id: true,
        image: true,
        imageShiny: true,
        index: true,
        cries: true,
      },
      orderBy: pokemonSchema.index,
      with: {
        type: {
          columns: {
            pokemonReference: false,
            typeReference: false,
          },
          with: {
            type: {
              columns: {
                name: true,
                id: true,
              },
            },
          },
        },
        species: {
          columns: {
            id: true,
            index: true,
            name: true,
            genera: true,
            formSwitchable: true,
            genderDifference: true,
            legendary: true,
            mythical: true,
            shape: true,
          },
          with: {
            generation: {
              columns: {
                id: true,
                name: true,
              },
              with: {
                mainRegion: {
                  columns: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const pokemons = query.map((item) => ({
      id: item.id,
      index: item.index,
      name: item.name,
      cries: item.cries,
      image: item.image,
      imageShiny: item.imageShiny,
      types: item.type.map((type) => ({
        name: type.type?.name,
        id: type.type?.id,
      })),
      species: {
        id: item.species?.id,
        index: item.species?.index,
        name: item.species?.name,
      },
      genera: item.species?.genera,
      shape: item.species?.shape,
      formSwitchable: item.species?.formSwitchable,
      genderDifference: item.species?.genderDifference,
      legendary: item.species?.legendary,
      mythical: item.species?.mythical,
      generation: {
        id: item.species?.generation?.id,
        name: item.species?.generation?.name,
      },
      region: {
        id: item.species?.generation?.mainRegion?.id,
        name: item.species?.generation?.mainRegion?.name,
      },
    }));

    return c.json({
      success: true,
      data: pokemons,
    });
  }
);

export default pokemonRoute;
