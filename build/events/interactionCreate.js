"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function run(client, interaction) {
    if (interaction.isButton())
        client.emit('interactionButtonCreate', (interaction));
    if (interaction.isCommand())
        client.emit('interactionCommandCreate', (interaction));
    if (interaction.isContextMenu())
        client.emit('interactionContextMenuCreate', (interaction));
    if (interaction.isSelectMenu())
        client.emit('interactionSelectMenuCreate', (interaction));
    if (interaction.isMessageComponent())
        client.emit('interactionMessageComponentCreate', (interaction));
}
exports.default = run;
