import {
  type Client,
  type Guild,
  type GuildMember,
  type Role,
  type GuildEmoji,
  type GuildChannel,
  type ThreadChannel,
  type User,
  PermissionFlagsBits,
} from 'discord.js';

export class DiscordResolve {
  client;
  constructor(client: Client) {
    this.client = client;
  }
  /**
   *
   * @param {Guild} guild The guild
   * @param {string} arg The argument (id, mention, username, start of username )
   * @returns {GuildMember}
   */
  resolveMember = async (guild: Guild, arg: string) => {
    if (!arg || !guild || !guild.available) {
      return;
    }

    let member = guild.members.cache.find(
      (mem: GuildMember) =>
        mem.id === arg.replace('!', '').replace(/<@|>/g, '') || // Mention
        mem.user.username.toLowerCase() === arg.toLowerCase() || // Username
        `${mem.user.username.toLowerCase()}#${mem.user.discriminator}` === arg.toLowerCase() || // Username + discriminator
        mem.user.username.toLowerCase().startsWith(arg.toLowerCase()),
    ); // Starts with
    if (!member) {
      try {
        member = await (await guild.members.fetch({ query: arg, limit: 1 })).first();
        if (!member) {
          const id = arg.replace('!', '').replace(/<@|>/g, '');
          member = await guild.members.fetch(id);
        }

        return member;
      } catch {
        return undefined;
      }
    } else return member;
  };
  /**
   *
   * @param {string} arg The argument (id, mention, username, username and discriminator, start of username )
   * @returns {User}
   */
  resolveUser = async (arg: string) => {
    if (!arg) {
      return;
    }
    let user = this.client.users.cache.find(
      (u: User) =>
        u.id === arg.replace('!', '').replace(/<@|>/g, '') ||
        u.username.toLowerCase() === arg.toLowerCase() ||
        u.username.toLowerCase().startsWith(arg.toLowerCase()) ||
        `${u.username.toLowerCase()}#${u.discriminator}` === arg.toLowerCase(),
    );
    if (!user) {
      try {
        const id = arg.replace('!', '').replace(/<@|>/g, '');
        return await this.client.users.fetch(id);
      } catch {
        return undefined;
      }
    }
    return user;
  };
  /**
   *
   * @param {Guild} guild The guild
   * @param {string} arg The argument (id, mention, name)
   * @returns {GuildChannel}
   */
  resolveChannel = (guild: Guild, arg: string) => {
    if (!guild || !arg) {
      return;
    }
    const channel = guild.channels.cache.find(
      (chan: GuildChannel | ThreadChannel) =>
        chan.id === arg ||
        chan.id === arg.replace(/<#|>/g, '') ||
        chan.name.toLowerCase().startsWith(arg.toLowerCase()) ||
        chan.name === arg.toLowerCase(),
    );
    return channel;
  };
  /**
   *
   * @param {string} arg The argument (id, name)
   * @returns {Guild}
   */
  resolveGuild = (arg: string) => {
    if (!arg) return null;
    const guild = this.client.guilds.cache.find((g: Guild) => g.id === arg || g.name === arg.toLowerCase());
    return guild;
  };
  /**
   *
   * @param {Guild} guild The guild
   * @param {string} arg The argument (id, mention, name, start of name )
   * @returns
   */
  resolveRole = (guild: Guild, arg: string) => {
    if (!guild || !arg) return null;
    const role = guild.roles.cache.find(
      (r: Role) =>
        r.id === arg ||
        r.id === arg.replace('&', '').replace(/<@|>/g, '') ||
        r.name.toLowerCase().startsWith(arg.toLowerCase()) ||
        r.name === arg.toLowerCase(),
    );
    return role;
  };

  /**
   *
   * @param {Guild} guild The guild
   * @param {string} arg The argument (id, name, emoji )
   * @returns {GuildEmoji}
   */
  resolveGuildEmoji = (guild: Guild, arg: string) => {
    if (!guild || !arg) return null;
    const emoji =
      guild.emojis.cache.find((e: GuildEmoji) => e.id == arg || e.name == arg) ||
      guild.emojis.cache.find((e: GuildEmoji) => e.id == arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]); // await guild.emojis.cache.find(arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]).catch(() => null);
    return emoji;
  };
  /**
   *
   * @param {GuildMember} member
   * @returns {boolean}
   */
  resolveModo = (member: GuildMember) => {
    if (
      member.permissions.has(PermissionFlagsBits.Administrator) ||
      member.permissions.has(PermissionFlagsBits.ManageGuild) ||
      member.permissions.has(PermissionFlagsBits.ModerateMembers)
    )
      return true;
    return false;
  };
}
