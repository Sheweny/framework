"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function run(client, interaction) {
    if (interaction.isButton())
        return client.emit('interactionButtonCreate', (interaction));
    if (interaction.isCommand())
        return client.emit('interactionCommandCreate', (interaction));
    if (interaction.isContextMenu())
        return client.emit('interactionContextMenuCreate', (interaction));
    if (interaction.isSelectMenu())
        return client.emit('interactionSelectMenuCreate', (interaction));
    if (interaction.isMessageComponent())
        return client.emit('interactionMessageComponentCreate', (interaction));
}
exports.default = run;
