import { describe, test, expect } from 'vitest';
import { DiscordResolve as resolve } from '../src';
import { Collection, type Client, type User, type Guild, GuildChannel, Role } from 'discord.js';

type Modify<T, R> = Omit<T, keyof R> & R;

type PartialClient = Partial<Modify<Client, { users: PartialCustomUserManager }>>;
type PartialGuild = Partial<Omit<Modify<Guild, {channels: PartialCustomGuildChannelManager, roles: PartialCustomRoleManager}>, 'valueOf'>>;


// Partial managers (partials managers without valueOf)
type PartialCustomUserManager = Partial<Omit<CustomUsermanager, 'valueOf'>>;
type PartialCustomGuildChannelManager = Partial<Omit<CustomGuildChannelManager, 'valueOf'>>;
type PartialCustomRoleManager = Partial<Omit<CustomRoleManager, 'valueOf'>>;

// Custom managers (managers with custom cache)
type CustomUsermanager = Modify<Client['users'], { cache: Collection<string, PartialUser> }>;
type CustomGuildChannelManager = Modify<Guild['channels'], { cache: Collection<string, PartialGuildChannel> }>;
type CustomRoleManager = Modify<Guild['roles'], { cache: Collection<string, PartialRole> }>;


// Partial structures (channels, roles, users, etc.) without toString and valueOf (discord.js custom methods)
type PartialUser = Partial<Omit<User, 'toString' | 'valueOf'>>;
type PartialGuildChannel = Partial<Omit<GuildChannel, 'toString' | 'valueOf'>>;
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
};


const guild: PartialGuild = {
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
};

const fakeClient = client as unknown as Client;
const fakeGuild = guild as unknown as Guild;

describe('resolveRole', () => {
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

describe('resolveUser', () => {
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
