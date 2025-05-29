import * as abilityOnEffectEntry from "./ability-on-effect-entry.schema";
import * as abilityOnFlavorText from "./ability-on-flavor-text.schema";
import * as ability from "./ability.schema";
import * as contestEffect from "./contest-effect.schema";
import * as contestType from "./contest-type.schema";
import * as eggGroup from "./egg-group.schema";
import * as evolutionDetails from "./evolution-details.schema";
import * as generation from "./generation.schema";
import * as moveAilment from "./move-ailment.schema";
import * as moveDamageClass from "./move-damage-class.schema";
import * as moveTarget from "./move-target.schema";
import * as movesOnEffectChanges from "./moves-on-effect-changes.schema";
import * as movesOnFlavorText from "./moves-on-flavor-text.schema";
import * as movesOnPokemon from "./moves-on-pokemon.schema";
import * as moves from "./moves.schema";
import * as pokemonOnAbility from "./pokemon-on-ability.schema";
import * as pokemonSpeciesOnEggGroup from "./pokemon-species-on-egg-group.schema";
import * as pokemonSpeciesOnFlavorText from "./pokemon-species-on-flavor-text.schema";
import * as pokemonSpeciesOnVariety from "./pokemon-species-on-variety.schema";
import * as pokemonSpecies from "./pokemon-species.schema";
import * as pokemon from "./pokemon.schema";
import * as regionOnVersionGroup from "./region-on-version-group.schema";
import * as region from "./region.schema";
import * as typeOnPokemon from "./type-on-pokemon.schema";
import * as type from "./type.schema";
import * as versionGroup from "./version-group.schema";
import * as version from "./version.schema";

export default {
  ...abilityOnEffectEntry,
  ...abilityOnFlavorText,
  ...ability,
  ...contestEffect,
  ...contestType,
  ...eggGroup,
  ...evolutionDetails,
  ...generation,
  ...moveAilment,
  ...moveDamageClass,
  ...moveTarget,
  ...movesOnEffectChanges,
  ...movesOnFlavorText,
  ...movesOnPokemon,
  ...moves,
  ...pokemonOnAbility,
  ...pokemonSpeciesOnEggGroup,
  ...pokemonSpeciesOnFlavorText,
  ...pokemonSpeciesOnVariety,
  ...pokemonSpecies,
  ...pokemon,
  ...regionOnVersionGroup,
  ...region,
  ...typeOnPokemon,
  ...type,
  ...versionGroup,
  ...version,
};
