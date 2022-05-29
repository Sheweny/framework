"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function run(client, interaction) {
    if (interaction.isButton())
        client.emit('interactionButtonCreate', interaction);
    if (interaction.isCommand() || interaction.isContextMenuCommand())
        client.emit('interactionCommandCreate', interaction);
    if (interaction.isAutocomplete())
        client.emit('interactionAutocompleteCreate', interaction);
    if (interaction.isContextMenuCommand())
        client.emit('interactionContextMenuCreate', interaction);
    if (interaction.isSelectMenu())
        client.emit('interactionSelectMenuCreate', interaction);
    if (interaction.isMessageComponent())
        client.emit('interactionMessageComponentCreate', interaction);
    if (interaction.isModalSubmit())
        client.emit('interactionModalSubmitCreate', interaction);
}
exports.default = run;
