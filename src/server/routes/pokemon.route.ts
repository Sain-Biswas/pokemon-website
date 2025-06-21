import { createRoute, z } from "@hono/zod-openapi";
import createOpenAPIRoute from "../lib/create-route";
import HTTPStatusCodes from "../constant/http-status-codes";
import database from "../../drizzle";
import { pokemonSchema } from "../../drizzle/schema/pokemon.schema";
import { eq } from "drizzle-orm";
import { pokemonSpeciesSchema } from "../../drizzle/schema/pokemon-species.schema";
import HTTPStatusKeys from "../constant/http-status-keys";

const pokemonRoute = createOpenAPIRoute()
  .openapi(
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
                    image_shiny: z.string().url(),
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
                    form_switchable: z.boolean(),
                    gender_difference: z.boolean(),
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
                    image_shiny:
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
                    form_switchable: false,
                    gender_difference: false,
                    legendary: false,
                    mythical: false,
                    generation: {
                      id: "generation-i",
                      name: "Generation I",
                    },
                    region: {
                      id: "kanto",
                      name: "Kanto",
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
        index: item.index!,
        name: item.name!,
        cries: item.cries!,
        image: item.image!,
        image_shiny: item.imageShiny!,
        types: item.type.map((type) => ({
          name: type.type?.name!,
          id: type.type?.id!,
        })),
        species: {
          id: item.species?.id!,
          index: item.species?.index!,
          name: item.species?.name!,
        },
        genera: item.species?.genera!,
        shape: item.species?.shape!,
        form_switchable: item.species?.formSwitchable!,
        gender_difference: item.species?.genderDifference!,
        legendary: item.species?.legendary!,
        mythical: item.species?.mythical!,
        generation: {
          id: item.species?.generation?.id!,
          name: item.species?.generation?.name!,
        },
        region: {
          id: item.species?.generation?.mainRegion?.id!,
          name: item.species?.generation?.mainRegion?.name!,
        },
      }));

      return c.json(
        {
          success: true,
          data: pokemons,
        },
        200
      );
    }
  )
  .openapi(
    createRoute({
      method: "get",
      path: "/list",
      responses: {
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
        [HTTPStatusCodes.OK]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z.boolean(),
                pokemons: z.array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    image: z.string().url(),
                    image_shiny: z.string().url(),
                    types: z.array(
                      z.object({
                        id: z.string(),
                        name: z.string(),
                      })
                    ),
                  })
                ),
              }),
              example: {
                success: true,
                pokemons: [
                  {
                    id: "charizard",
                    name: "Charizard",
                    image:
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png",
                    image_shiny:
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/6.png",
                    types: [
                      {
                        id: "fire",
                        name: "Fire",
                      },
                      {
                        id: "flying",
                        name: "Flying",
                      },
                    ],
                  },
                ],
              },
            },
          },
          description: "List of pokemons with minimal info.",
        },
      },
    }),
    async (c) => {
      const query = await database.query.pokemonSchema.findMany({
        columns: {
          id: true,
          image: true,
          imageShiny: true,
          name: true,
        },
        with: {
          type: {
            columns: {
              pokemonReference: false,
              typeReference: false,
            },
            with: {
              type: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: pokemonSchema.index,
      });

      const pokemons = query.map((item) => ({
        id: item.id!,
        name: item.name!,
        image: item.image!,
        image_shiny: item.imageShiny!,
        types: item.type.map((type) => ({
          id: type.type?.id!,
          name: type.type?.name!,
        })),
      }));

      return c.json(
        {
          success: true,
          pokemons,
        },
        HTTPStatusCodes.OK
      );
    }
  )
  .openapi(
    createRoute({
      method: "get",
      path: "/{id}",
      request: {
        params: z.object({
          id: z.string().openapi({
            param: {
              name: "id",
              in: "path",
            },
            example: "pikachu",
          }),
        }),
      },
      responses: {
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
                path: "/api/pokemon/pikachu",
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
        [HTTPStatusCodes.ACCEPTED]: {
          content: {
            "application/json": {
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
              example: {
                success: true,
                error: {
                  message: "No pokemon with index or id as pikachu",
                  detail:
                    "This doesn't match any entry in our database, please check again and try again. You can check pokemon list for available pokemons.",
                  name: "NO_CONTENT",
                },
                code: "NO_CONTENT",
                timestamp: "2025-05-29T09:53:08.060Z",
                path: "/api/pokemon/pikachu",
              },
            },
          },
          description:
            "The given id doesn't match any pokemon in our database.",
        },
        [HTTPStatusCodes.OK]: {
          content: {
            "application/json": {
              schema: z.object({
                success: z.boolean(),
                pokemon: z.object({
                  id: z.string(),
                  index: z.number(),
                  name: z.string(),
                  base_happiness: z.number(),
                  capture_rate: z.number(),
                  color: z.string(),
                  form_switchable: z.boolean(),
                  gender_rate: z.number(),
                  genera: z.string(),
                  growth_rate: z.string(),
                  habitat: z.string(),
                  gender_difference: z.boolean(),
                  legendary: z.boolean(),
                  mythical: z.boolean(),
                  shape: z.string(),

                  generation: z.object({
                    id: z.string(),
                    name: z.string(),
                  }),
                  region: z.object({
                    id: z.string(),
                    name: z.string(),
                  }),

                  egg_group: z.array(
                    z.object({
                      id: z.string(),
                      name: z.string(),
                    })
                  ),

                  flavor_text: z.array(
                    z.object({
                      entry: z.string(),
                      version: z.object({
                        id: z.string(),
                        name: z.string(),
                      }),
                      generation: z.string(),
                      region: z.string(),
                    })
                  ),

                  variety: z.array(
                    z.object({
                      is_default: z.boolean(),
                      id: z.string(),
                      name: z.string(),
                      base_experience: z.number(),
                      cries: z.string(),
                      image: z.string(),
                      image_shiny: z.string(),
                      height: z.number(),
                      weight: z.number(),
                      hp: z.number(),
                      attack: z.number(),
                      defence: z.number(),
                      special_attack: z.number(),
                      special_defence: z.number(),
                      speed: z.number(),

                      types: z.array(
                        z.object({
                          id: z.string(),
                          name: z.string(),
                        })
                      ),

                      ability: z.array(
                        z.object({
                          is_hidden: z.boolean(),
                          name: z.string(),
                          id: z.string(),
                          effect: z.string(),
                          shortEffect: z.string(),
                          flavor_text: z.array(
                            z.object({
                              entry: z.string(),
                              generation: z.string(),
                              versions: z.array(z.string()),
                              regions: z.array(z.string()),
                            })
                          ),
                        })
                      ),

                      moves: z.array(
                        z.object({
                          name: z.string(),
                          id: z.string(),
                          accuracy: z.number(),
                          power: z.number(),
                          pp: z.number(),
                          type: z.object({
                            name: z.string(),
                            id: z.string(),
                          }),
                          generation: z.object({
                            id: z.string(),
                            name: z.string(),
                          }),
                          region: z.object({
                            id: z.string(),
                            name: z.string(),
                          }),
                          target: z.object({
                            id: z.string(),
                            name: z.string(),
                          }),
                          move_damage_class: z.object({
                            id: z.string(),
                            name: z.string(),
                          }),
                        })
                      ),
                    })
                  ),
                }),
              }),
            },
          },
          description: "Detailed information about a certain pokemon.",
        },
      },
    }),
    async (c) => {
      const pathVariable = c.req.valid("param").id;
      const type = Number.isNaN(Number.parseInt(pathVariable))
        ? eq(pokemonSpeciesSchema.id, pathVariable)
        : eq(pokemonSpeciesSchema.index, Number.parseInt(pathVariable));

      const query = await database.query.pokemonSpeciesSchema.findFirst({
        where: type,
        columns: {
          id: true,
          index: true,
          name: true,
          baseHappiness: true,
          captureRate: true,
          color: true,
          evolutionChainReference: true,
          formSwitchable: true,
          genderRate: true,
          genera: true,
          growthRate: true,
          habitat: true,
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
                  id: true,
                  name: true,
                },
              },
            },
          },
          egggroup: {
            columns: {
              eggGroupReference: false,
              pokemonReference: false,
            },
            with: {
              eggGroup: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          flavorText: {
            columns: {
              flavorText: true,
            },
            with: {
              version: {
                columns: {
                  id: true,
                  name: true,
                },
                with: {
                  versionGroup: {
                    columns: {
                      id: false,
                      generationReference: false,
                      index: false,
                    },
                    with: {
                      generation: {
                        columns: {
                          name: true,
                        },
                        with: {
                          mainRegion: {
                            columns: {
                              name: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },

          variety: {
            columns: {
              isDefault: true,
            },
            with: {
              pokemon: {
                columns: {
                  id: true,
                  name: true,
                  baseExperience: true,
                  cries: true,
                  image: true,
                  imageShiny: true,
                  height: true,
                  weight: true,
                  hp: true,
                  attack: true,
                  defence: true,
                  specialAttack: true,
                  specialDefence: true,
                  speed: true,
                },
                with: {
                  type: {
                    columns: {
                      pokemonReference: false,
                      typeReference: false,
                    },
                    with: {
                      type: {
                        columns: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                  ability: {
                    columns: {
                      isHidden: true,
                    },
                    with: {
                      ability: {
                        columns: {
                          id: true,
                          effect: true,
                          name: true,
                          shortEffect: true,
                        },
                        with: {
                          flavorText: {
                            columns: {
                              flavorText: true,
                            },
                            with: {
                              versionGroup: {
                                columns: {
                                  id: false,
                                  generationReference: false,
                                  index: false,
                                },
                                with: {
                                  generation: {
                                    columns: {
                                      name: true,
                                    },
                                  },
                                  versions: {
                                    columns: {
                                      name: true,
                                    },
                                  },
                                  regions: {
                                    columns: {
                                      regionReference: false,
                                      versionGroupReference: false,
                                    },
                                    with: {
                                      region: {
                                        columns: {
                                          name: true,
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },

                  moves: {
                    columns: {
                      moveReference: false,
                      pokemonReference: false,
                    },
                    with: {
                      move: {
                        columns: {
                          id: true,
                          name: true,
                          accuracy: true,
                          power: true,
                          pp: true,
                        },
                        with: {
                          type: {
                            columns: {
                              id: true,
                              name: true,
                            },
                          },
                          target: {
                            columns: {
                              id: true,
                              name: true,
                            },
                          },
                          moveDamageClass: {
                            columns: {
                              id: true,
                              name: true,
                            },
                          },
                          generation: {
                            columns: {
                              id: true,
                              name: true,
                            },
                            with: {
                              mainRegion: {
                                columns: {
                                  id: true,
                                  name: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      console.log(query);

      if (!!!query) {
        return c.json(
          {
            success: true,
            error: {
              message: `No pokemon with index or id as ${pathVariable}`,
              detail: `This doesn't match any entry in our database, please check again and try again. You can check pokemon list for available pokemons.`,
              name: "NO_CONTENT",
            },
            code: "NO_CONTENT",
            timestamp: new Date(),
            path: c.req.path,
          },
          HTTPStatusCodes.ACCEPTED
        );
      }

      const pokemon = {
        id: query.id!,
        index: query.index!,
        name: query.name!,
        base_happiness: query.baseHappiness!,
        capture_rate: query.captureRate!,
        color: query.color!,
        form_switchable: query.formSwitchable!,
        gender_rate: query.genderRate!,
        genera: query.genera!,
        growth_rate: query.growthRate!,
        habitat: query.habitat!,
        gender_difference: query.genderDifference!,
        legendary: query.legendary!,
        mythical: query.mythical!,
        shape: query.shape!,

        generation: {
          id: query.generation?.id!,
          name: query.generation?.name!,
        },
        region: {
          id: query.generation?.mainRegion?.id!,
          name: query.generation?.mainRegion?.name!,
        },

        egg_group: query.egggroup.map((i) => ({
          id: i.eggGroup?.id!,
          name: i.eggGroup?.name!,
        })),

        flavor_text: query.flavorText.map((i) => ({
          entry: i.flavorText!,
          version: {
            id: i.version?.id!,
            name: i.version?.name!,
          },
          generation: i.version?.versionGroup?.generation?.name!,
          region: i.version?.versionGroup?.generation?.mainRegion?.name!,
        })),

        variety: query.variety.map((i) => ({
          is_default: i.isDefault!,
          id: i.pokemon?.id!,
          name: i.pokemon?.name!,
          base_experience: i.pokemon?.baseExperience!,
          cries: i.pokemon?.cries!,
          image: i.pokemon?.image!,
          image_shiny: i.pokemon?.imageShiny!,
          height: i.pokemon?.height!,
          weight: i.pokemon?.weight!,
          hp: i.pokemon?.hp!,
          attack: i.pokemon?.attack!,
          defence: i.pokemon?.defence!,
          special_attack: i.pokemon?.specialAttack!,
          special_defence: i.pokemon?.specialDefence!,
          speed: i.pokemon?.speed!,

          types: i.pokemon?.type.map((t) => ({
            id: t.type?.id!,
            name: t.type?.name!,
          }))!,

          ability: i.pokemon?.ability.map((a) => ({
            is_hidden: a.isHidden!,
            name: a.ability?.name!,
            id: a.ability?.id!,
            effect: a.ability?.effect!,
            shortEffect: a.ability?.shortEffect!,
            flavor_text: a.ability?.flavorText.map((f) => ({
              entry: f.flavorText!,
              generation: f.versionGroup?.generation?.name!,
              versions: f.versionGroup?.versions.map((j) => j.name!)!,
              regions: f.versionGroup?.regions.map((j) => j.region?.name!)!,
            }))!,
          }))!,

          moves: i.pokemon?.moves.map((m) => ({
            name: m.move?.name!,
            id: m.move?.id!,
            accuracy: m.move?.accuracy!,
            power: m.move?.power!,
            pp: m.move?.pp!,

            type: {
              name: m.move?.type?.name!,
              id: m.move?.type?.id!,
            },

            generation: {
              id: m.move?.generation?.id!,
              name: m.move?.generation?.name!,
            },
            region: {
              id: m.move?.generation?.mainRegion?.id!,
              name: m.move?.generation?.mainRegion?.name!,
            },

            target: {
              id: m.move?.target?.id!,
              name: m.move?.target?.name!,
            },

            move_damage_class: {
              id: m.move?.moveDamageClass?.id!,
              name: m.move?.moveDamageClass?.name!,
            },
          }))!,
        })),
      };

      return c.json(
        {
          success: true,
          pokemon,
        },
        HTTPStatusCodes.OK
      );
    }
  );

export default pokemonRoute;
