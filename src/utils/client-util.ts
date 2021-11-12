import { Intents } from 'discord.js';
import type { IntentsString, PartialTypes } from 'discord.js';

// export function replaceOptions(options: ShewenyClientOptions) {
//   if (!options || (options && !options.intents)) return options;
//   if (options.allIntents) options.intents = getAllIntents();
//   if (options.allPartials) options.partials = getAllPartials();
//   return options;
// }
// Add all discord.js intents to the option
export function getAllIntents(): Intents {
  const intents = new Intents();
  for (const intent of Object.keys(Intents.FLAGS)) {
    intents.add([intent as IntentsString]);
  }
  return intents;
}

// Add all discord.js partials to the option
export function getAllPartials(): PartialTypes[] {
  return ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION'];
}
