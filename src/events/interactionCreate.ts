import { Interaction } from "discord.js";
import { ShewenyClient } from "../ShewenyClient";

export default function run(client: ShewenyClient, interaction: Interaction) {
  if (interaction.isButton()) return client.emit("interactionButtonCreate", interaction);
  if (interaction.isCommand() || interaction.isContextMenu())
    return client.emit("interactionCommandCreate", interaction);
  if (interaction.isContextMenu())
    return client.emit("interactionContextMenuCreate", interaction);
  if (interaction.isSelectMenu())
    return client.emit("interactionSelectMenuCreate", interaction);
  if (interaction.isMessageComponent())
    return client.emit("interactionMessageComponentCreate", interaction);
}
