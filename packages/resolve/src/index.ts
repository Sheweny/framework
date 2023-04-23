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
  /**
   *
   * @param {Guild} guild The guild
   * @param {string} arg The argument (id, mention, username, start of username )
   * @returns {GuildMember}
   */
  static resolveMember = async (guild: Guild, arg: string) => {
    if (!arg || !guild || !guild.available) {
      return;
    }

    let member = guild.members.cache.find(
      (mem: GuildMember) =>
        mem.id === arg.replace('!', '').replace(/<@|>/g, '') || // Mention
        mem.displayName.toLowerCase() === arg.toLowerCase() ||
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
  static resolveUser = async (client: Client, arg: string) => {
    if (!arg) {
      return;
    }
    let user = client.users.cache.find(
      (u: User) =>
        u.id === arg.replace('!', '').replace(/<@|>/g, '') ||
        u.username.toLowerCase() === arg.toLowerCase() ||
        u.username.toLowerCase().startsWith(arg.toLowerCase()) ||
        `${u.username.toLowerCase()}#${u.discriminator}` === arg.toLowerCase(),
    );
    if (!user) {
      try {
        const id = arg.replace('!', '').replace(/<@|>/g, '');
        user = await client.users.fetch(id);
      } catch (e) {
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
  static resolveChannel = (guild: Guild, arg: string) => {
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
  static resolveGuild = (client: Client, arg: string) => {
    if (!arg) return null;
    const guild = client.guilds.cache.find((g: Guild) => g.id === arg || g.name === arg.toLowerCase());
    return guild;
  };
  /**
   *
   * @param {Guild} guild The guild
   * @param {string} arg The argument (id, mention, name, start of name )
   * @returns
   */
  static resolveRole = (guild: Guild, arg: string) => {
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
  static resolveGuildEmoji = (guild: Guild, arg: string) => {
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
  static resolveModo = (member: GuildMember) => {
    if (
      member.permissions.has(PermissionFlagsBits.Administrator) ||
      member.permissions.has(PermissionFlagsBits.ManageGuild) ||
      member.permissions.has(PermissionFlagsBits.ModerateMembers)
    )
      return true;
    return false;
  };
}
