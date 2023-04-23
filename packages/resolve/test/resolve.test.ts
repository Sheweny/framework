import { describe, test, expect } from 'vitest';
import { DiscordResolve as resolve } from '../src';
import { 
  Collection, 
  type Client, 
  type User, 
  type Guild, 
  type GuildChannel, 
  type Role, 
  type GuildEmoji, 
  type GuildMember} from 'discord.js';

type Modify<T, R> = Omit<T, keyof R> & R;

type PartialClient = Partial<Modify<Client, { users: PartialCustomUserManager, guilds: PartialCustomGuildManager }>>;
type PartialGuild = Partial<Omit<Modify<Guild, {channels: PartialCustomGuildChannelManager, roles: PartialCustomRoleManager, emojis: PartialCustomGuildEmojiManager, members: PartialCustomGuildMemberManager}>, 'valueOf'>>;


// Partial managers (partials managers without valueOf)
type PartialCustomUserManager = Partial<Omit<CustomUserManager, 'valueOf'>>;
type PartialCustomGuildMemberManager = Partial<Omit<CustomGuildMemberManager, 'valueOf'>>;
type PartialCustomGuildManager = Partial<Omit<CustomGuildManager, 'valueOf'>>;
type PartialCustomGuildChannelManager = Partial<Omit<CustomGuildChannelManager, 'valueOf'>>;
type PartialCustomGuildEmojiManager = Partial<Omit<CustomGuildEmojiManager, 'valueOf'>>;
type PartialCustomRoleManager = Partial<Omit<CustomRoleManager, 'valueOf'>>;

// Custom managers (managers with custom cache)
type CustomUserManager = Modify<Client['users'], { cache: Collection<string, PartialUser> }>;
type CustomGuildMemberManager = Modify<Guild['members'], { cache: Collection<string, PartialGuildMember> }>;
type CustomGuildManager = Modify<Client['guilds'], { cache: Collection<string, PartialGuild> }>;
type CustomGuildChannelManager = Modify<Guild['channels'], { cache: Collection<string, PartialGuildChannel> }>;
type CustomGuildEmojiManager = Modify<Guild['emojis'], { cache: Collection<string, PartialGuildEmoji> }>;
type CustomRoleManager = Modify<Guild['roles'], { cache: Collection<string, PartialRole> }>;


// Partial structures (channels, roles, users, etc.) without toString and valueOf (discord.js custom methods)
type PartialUser = Partial<Omit<User, 'toString' | 'valueOf'>>;
type PartialGuildMember = Partial<Omit<Modify<GuildMember, {user: PartialUser}>, 'toString' | 'valueOf'>>;
type PartialGuildChannel = Partial<Omit<GuildChannel, 'toString' | 'valueOf'>>;
type PartialGuildEmoji = Partial<Omit<GuildEmoji, 'toString' | 'valueOf'>>;
type PartialRole = Partial<Omit<Role, 'toString' | 'valueOf'>>;



const client: PartialClient = {
  users: {
    cache: new Collection<string, PartialUser>([
      ['000000000000000000', { id: '000000000000000000', username: 'user1', discriminator: '1111' }],
      ['000000000000000001', { id: '000000000000000001', username: 'user22', discriminator: '2222' }],
      ['000000000000000002', { id: '000000000000000002', username: 'user333', discriminator: '3333' }],
      ['000000000000000003', { id: '000000000000000003', username: 'user4444', discriminator: '4444' }],
      ['000000000000000004', { id: '000000000000000004', username: 'user55555', discriminator: '5555' }],
    ]),
  },
  guilds: {
    cache: new Collection<string, PartialGuild>([
      ['000000000000000000', { id: '000000000000000000', name: 'guild1' }],
      ['000000000000000001', { id: '000000000000000001', name: 'guild22' }],
      ['000000000000000002', { id: '000000000000000002', name: 'guild333' }],
      ['000000000000000003', { id: '000000000000000003', name: 'guild4444' }],
      ['000000000000000004', { id: '000000000000000004', name: 'guild55555' }],
    ]),
  }
};


const guild: PartialGuild = {
  available: true,
  roles: {
    cache: new Collection<string, PartialRole>([
      ['000000000000000000', { id: '000000000000000000', name: 'role1' }],
      ['000000000000000001', { id: '000000000000000001', name: 'role22' }],
      ['000000000000000002', { id: '000000000000000002', name: 'role333' }],
      ['000000000000000003', { id: '000000000000000003', name: 'role4444' }],
      ['000000000000000004', { id: '000000000000000004', name: 'role55555' }],
    ]),
  },
  channels: {
    cache: new Collection<string, PartialGuildChannel>([
      ['000000000000000000', { id: '000000000000000000', name: 'channel1' }],
      ['000000000000000001', { id: '000000000000000001', name: 'channel22' }],
      ['000000000000000002', { id: '000000000000000002', name: 'channel333' }],
      ['000000000000000003', { id: '000000000000000003', name: 'channel4444' }],
      ['000000000000000004', { id: '000000000000000004', name: 'channel55555' }],
    ]),
  },
  emojis: {
    cache: new Collection<string, PartialGuildEmoji>([
      ['000000000000000000', { id: '000000000000000000', name: 'emoji1' }],
      ['000000000000000001', { id: '000000000000000001', name: 'emoji22' }],
      ['000000000000000002', { id: '000000000000000002', name: 'emoji333' }],
      ['000000000000000003', { id: '000000000000000003', name: 'emoji4444' }],
      ['000000000000000004', { id: '000000000000000004', name: 'emoji55555' }],
    ]),
  },
  members: {
    cache: new Collection<string, PartialGuildMember>([
      ['000000000000000000', { id: '000000000000000000', displayName: "display_user1", user: { id: '000000000000000000', username: 'user1', discriminator: '1111' } }],
      ['000000000000000001', { id: '000000000000000001', displayName: "display_user22", user: { id: '000000000000000001', username: 'user22', discriminator: '2222' } }],
      ['000000000000000002', { id: '000000000000000002', displayName: "display_user333", user: { id: '000000000000000002', username: 'user333', discriminator: '3333' } }],
      ['000000000000000003', { id: '000000000000000003', displayName: "display_user4444", user: { id: '000000000000000003', username: 'user4444', discriminator: '4444' } }],
      ['000000000000000004', { id: '000000000000000004', displayName: "display_user55555", user: { id: '000000000000000004', username: 'user55555', discriminator: '5555' } }]
    ]),
  },
};

const fakeClient = client as unknown as Client;
const fakeGuild = guild as unknown as Guild;

describe('resolveRole (by id, mention, name, start of name)', () => {
  test('finds the role by ID', () => {
    expect(resolve.resolveRole(fakeGuild, '000000000000000000')).toEqual({ id: '000000000000000000', name: 'role1' });
    expect(resolve.resolveRole(fakeGuild, '000000000000000001')).toEqual({ id: '000000000000000001', name: 'role22' });
    expect(resolve.resolveRole(fakeGuild, '000')).toBeUndefined();
  });
  test('finds the role by mention', () => {
    expect(resolve.resolveRole(fakeGuild, '<@&000000000000000000>')).toEqual({ id: '000000000000000000', name: 'role1' });
    expect(resolve.resolveRole(fakeGuild, '<@&000000000000000001>')).toEqual({ id: '000000000000000001', name: 'role22' });
    expect(resolve.resolveRole(fakeGuild, '<@&000>')).toBeUndefined();
  });
  test('finds the role by name', () => {
    expect(resolve.resolveRole(fakeGuild, 'role1')).toEqual({ id: '000000000000000000', name: 'role1' });
    expect(resolve.resolveRole(fakeGuild, 'role2')).toEqual({ id: '000000000000000001', name: 'role22' });
    expect(resolve.resolveRole(fakeGuild, 'role3')).toEqual({ id: '000000000000000002', name: 'role333' });
    expect(resolve.resolveRole(fakeGuild, 'role4')).toEqual({ id: '000000000000000003', name: 'role4444' });
    expect(resolve.resolveRole(fakeGuild, 'role0')).toBeUndefined();
  });
  test('finds the role by start of name', () => {
    expect(resolve.resolveRole(fakeGuild, 'role')).toEqual({ id: '000000000000000000', name: 'role1' });
    expect(resolve.resolveRole(fakeGuild, 'role2')).toEqual({ id: '000000000000000001', name: 'role22' });
    expect(resolve.resolveRole(fakeGuild, 'role33')).toEqual({ id: '000000000000000002', name: 'role333' });
    expect(resolve.resolveRole(fakeGuild, 'role4')).toEqual({ id: '000000000000000003', name: 'role4444' });
    expect(resolve.resolveRole(fakeGuild, 'role5')).toEqual({ id: '000000000000000004', name: 'role55555' });
    expect(resolve.resolveRole(fakeGuild, 'role0')).toBeUndefined();
  });
});

describe('resolveUser (by id, mention, name, name & discriminator, start of name)', () => {
  test('finds the user by ID', async () => {
    expect(await resolve.resolveUser(fakeClient, '000000000000000000')).toEqual({id: '000000000000000000', username: 'user1', discriminator: '1111',});
    expect(await resolve.resolveUser(fakeClient, '000000000000000001')).toEqual({id: '000000000000000001', username: 'user22', discriminator: '2222'});
    expect(await resolve.resolveUser(fakeClient, '000')).toBeUndefined();
  });
  test('finds the user by mention', async () => {
    expect(await resolve.resolveUser(fakeClient, '<@000000000000000000>')).toEqual({id: '000000000000000000', username: 'user1', discriminator: '1111', });
    expect(await resolve.resolveUser(fakeClient, '<@000000000000000001>')).toEqual({id: '000000000000000001', username: 'user22', discriminator: '2222'});
    expect(await resolve.resolveUser(fakeClient, '<@000>')).toBeUndefined();
  });
  test('finds the user by name', async () => {
    expect(await resolve.resolveUser(fakeClient, 'user1')).toEqual({id: '000000000000000000', username: 'user1', discriminator: '1111', });
    expect(await resolve.resolveUser(fakeClient, 'user22')).toEqual({id: '000000000000000001', username: 'user22', discriminator: '2222'});
    expect(await resolve.resolveUser(fakeClient, '000')).toBeUndefined();
  });
    test('finds the user by name and discriminator', async () => {
    expect(await resolve.resolveUser(fakeClient, 'user1#1111')).toEqual({id: '000000000000000000', username: 'user1', discriminator: '1111', });
    expect(await resolve.resolveUser(fakeClient, 'user22#2222')).toEqual({id: '000000000000000001', username: 'user22', discriminator: '2222'});
    expect(await resolve.resolveUser(fakeClient, '000#0000')).toBeUndefined();
  });
  test('finds the user by start of name', async () => {
    expect(await resolve.resolveUser(fakeClient, 'user')).toEqual({id: '000000000000000000', username: 'user1', discriminator: '1111', });
    expect(await resolve.resolveUser(fakeClient, 'user2')).toEqual({id: '000000000000000001', username: 'user22', discriminator: '2222', });
    expect(await resolve.resolveUser(fakeClient, '000')).toBeUndefined();
  });
});
describe('resolveChannel (by id, mention, name, start of name)', () => {
  test('finds the channel by ID', () => {
    expect(resolve.resolveChannel(fakeGuild, '000000000000000000')).toEqual({ id: '000000000000000000', name: 'channel1' });
    expect(resolve.resolveChannel(fakeGuild, '000000000000000001')).toEqual({ id: '000000000000000001', name: 'channel22' });
    expect(resolve.resolveChannel(fakeGuild, '000')).toBeUndefined();
  });
  test('finds the channel by mention', () => {
    expect(resolve.resolveChannel(fakeGuild, '<#000000000000000000>')).toEqual({ id: '000000000000000000', name: 'channel1' });
    expect(resolve.resolveChannel(fakeGuild, '<#000000000000000001>')).toEqual({ id: '000000000000000001', name: 'channel22' });
    expect(resolve.resolveChannel(fakeGuild, '<#000>')).toBeUndefined();
  });
  test('finds the channel by name', () => {
    expect(resolve.resolveChannel(fakeGuild, 'channel1')).toEqual({ id: '000000000000000000', name: 'channel1' });
    expect(resolve.resolveChannel(fakeGuild, 'channel2')).toEqual({ id: '000000000000000001', name: 'channel22' });
    expect(resolve.resolveChannel(fakeGuild, 'channel3')).toEqual({ id: '000000000000000002', name: 'channel333' });
    expect(resolve.resolveChannel(fakeGuild, 'channel4')).toEqual({ id: '000000000000000003', name: 'channel4444' });
    expect(resolve.resolveChannel(fakeGuild, 'channel0')).toBeUndefined();
  });
  test('finds the channel by start of name', () => {
    expect(resolve.resolveChannel(fakeGuild, 'channel')).toEqual({ id: '000000000000000000', name: 'channel1' });
    expect(resolve.resolveChannel(fakeGuild, 'channel2')).toEqual({ id: '000000000000000001', name: 'channel22' });
    expect(resolve.resolveChannel(fakeGuild, 'channel33')).toEqual({ id: '000000000000000002', name: 'channel333' });
    expect(resolve.resolveChannel(fakeGuild, 'channel4')).toEqual({ id: '000000000000000003', name: 'channel4444' });
    expect(resolve.resolveChannel(fakeGuild, 'channel5')).toEqual({ id: '000000000000000004', name: 'channel55555' });
    expect(resolve.resolveChannel(fakeGuild, 'channel0')).toBeUndefined();
  });
});

describe('resolveGuild (by name & id)', () => {
  test('finds the guild by ID', () => {
    expect(resolve.resolveGuild(fakeClient, '000000000000000000')).toEqual({ id: '000000000000000000', name: 'guild1' });
    expect(resolve.resolveGuild(fakeClient, '000000000000000001')).toEqual({ id: '000000000000000001', name: 'guild22' });
    expect(resolve.resolveGuild(fakeClient, '000')).toBeUndefined();
  });
  test('finds the guild by name', () => {
    expect(resolve.resolveGuild(fakeClient, 'guild1')).toEqual({ id: '000000000000000000', name: 'guild1' });
    expect(resolve.resolveGuild(fakeClient, 'guild22')).toEqual({ id: '000000000000000001', name: 'guild22' });
    expect(resolve.resolveGuild(fakeClient, 'guild0')).toBeUndefined();
  });
});

describe('resolveGuildEmoji (by id, name, mention)', () => {
  test('finds the emoji by ID', () => {
    expect(resolve.resolveGuildEmoji(fakeGuild, '000000000000000000')).toEqual({ id: '000000000000000000', name: 'emoji1' });
    expect(resolve.resolveGuildEmoji(fakeGuild, '000000000000000001')).toEqual({ id: '000000000000000001', name: 'emoji22' });
    expect(resolve.resolveGuildEmoji(fakeGuild, '000')).toBeUndefined();
  });
  test('finds the emoji by name', () => {
    expect(resolve.resolveGuildEmoji(fakeGuild, 'emoji1')).toEqual({ id: '000000000000000000', name: 'emoji1' });
    expect(resolve.resolveGuildEmoji(fakeGuild, 'emoji22')).toEqual({ id: '000000000000000001', name: 'emoji22' });
    expect(resolve.resolveGuildEmoji(fakeGuild, 'emoji0')).toBeUndefined();
  });
  test('finds the (normal) emoji by mention', () => {
    expect(resolve.resolveGuildEmoji(fakeGuild, '<:emoji1:000000000000000000>')).toEqual({ id: '000000000000000000', name: 'emoji1' });
    expect(resolve.resolveGuildEmoji(fakeGuild, '<:emoji22:000000000000000001>')).toEqual({ id: '000000000000000001', name: 'emoji22' });
    expect(resolve.resolveGuildEmoji(fakeGuild, '<:emoji0:000>')).toBeUndefined();
  });
  test('finds the (animated) emoji by mention', () => {
    expect(resolve.resolveGuildEmoji(fakeGuild, '<a:emoji1:000000000000000000>')).toEqual({ id: '000000000000000000', name: 'emoji1' });
    expect(resolve.resolveGuildEmoji(fakeGuild, '<a:emoji22:000000000000000001>')).toEqual({ id: '000000000000000001', name: 'emoji22' });
    expect(resolve.resolveGuildEmoji(fakeGuild, '<a:emoji0:000>')).toBeUndefined();
  });
});

describe('resolveMember (by id, mention, nickname, name, start of name, name + discriminator)', () => {
  test('finds the member by ID', async() => {
    expect(await resolve.resolveMember(fakeGuild, '000000000000000000')).toEqual({ id: '000000000000000000', displayName: "display_user1", user: { id: '000000000000000000', username: 'user1', discriminator: '1111' }});
    expect(await resolve.resolveMember(fakeGuild, '000000000000000001')).toEqual({ id: '000000000000000001', displayName: "display_user22", user: { id: '000000000000000001', username: 'user22', discriminator: '2222' }});
    expect(await resolve.resolveMember(fakeGuild, '000')).toBeUndefined();
  });
  test('finds the member by (member) mention', async() => {
    expect(await resolve.resolveMember(fakeGuild, '<@000000000000000000>')).toEqual({ id: '000000000000000000', displayName: "display_user1", user: { id: '000000000000000000', username: 'user1', discriminator: '1111' }});
    expect(await resolve.resolveMember(fakeGuild, '<@000000000000000001>')).toEqual({ id: '000000000000000001', displayName: "display_user22", user: { id: '000000000000000001', username: 'user22', discriminator: '2222' }});
    expect(await resolve.resolveMember(fakeGuild, '<@000>')).toBeUndefined();
  });
  test('finds the member by (nickname) mention', async() => {
    expect(await resolve.resolveMember(fakeGuild, '<@!000000000000000000>')).toEqual({ id: '000000000000000000', displayName: "display_user1", user: { id: '000000000000000000', username: 'user1', discriminator: '1111' }});
    expect(await resolve.resolveMember(fakeGuild, '<@!000000000000000001>')).toEqual({ id: '000000000000000001', displayName: "display_user22", user: { id: '000000000000000001', username: 'user22', discriminator: '2222' }});
    expect(await resolve.resolveMember(fakeGuild, '<@!000>')).toBeUndefined();
  });
  test('finds the member by nickname (displayName)', async() => { 
    expect(await resolve.resolveMember(fakeGuild, 'display_user1')).toEqual({ id: '000000000000000000', displayName: "display_user1", user: { id: '000000000000000000', username: 'user1', discriminator: '1111' } });
    expect(await resolve.resolveMember(fakeGuild, 'display_user22')).toEqual({ id: '000000000000000001', displayName: "display_user22", user: { id: '000000000000000001', username: 'user22', discriminator: '2222' } });
    expect(await resolve.resolveMember(fakeGuild, 'display_user0')).toBeUndefined();
  });
  test('finds the member by name (username)', async() => {
    expect(await resolve.resolveMember(fakeGuild, 'user1')).toEqual({ id: '000000000000000000', displayName: "display_user1", user: { id: '000000000000000000', username: 'user1', discriminator: '1111' } });
    expect(await resolve.resolveMember(fakeGuild, 'user22')).toEqual({ id: '000000000000000001', displayName: "display_user22", user: { id: '000000000000000001', username: 'user22', discriminator: '2222' } });
    expect(await resolve.resolveMember(fakeGuild, 'user0')).toBeUndefined();
  });
  test('finds the member by start of name (username)', async() => {
    expect(await resolve.resolveMember(fakeGuild, 'user')).toEqual({ id: '000000000000000000', displayName: "display_user1", user: { id: '000000000000000000', username: 'user1', discriminator: '1111' } });
    expect(await resolve.resolveMember(fakeGuild, 'user2')).toEqual({ id: '000000000000000001', displayName: "display_user22", user: { id: '000000000000000001', username: 'user22', discriminator: '2222' } });
    expect(await resolve.resolveMember(fakeGuild, 'user0')).toBeUndefined();
  });
  test('finds the member by name and discriminator (user#tag)', async() => {
    expect(await resolve.resolveMember(fakeGuild, 'user1#1111')).toEqual({ id: '000000000000000000', displayName: "display_user1", user: { id: '000000000000000000', username: 'user1', discriminator: '1111' } });
    expect(await resolve.resolveMember(fakeGuild, 'user22#2222')).toEqual({ id: '000000000000000001', displayName: "display_user22", user: { id: '000000000000000001', username: 'user22', discriminator: '2222' } });
    expect(await resolve.resolveMember(fakeGuild, 'user0#0000')).toBeUndefined();
  });
});