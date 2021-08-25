export interface IMessageCommandHandlerOptions {
    directory: string;
    prefix?: string;
}
export interface ILoadAllApplicationCommand {
    loadAll: boolean;
    guildId?: string;
}
