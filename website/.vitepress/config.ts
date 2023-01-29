import { defineConfig } from 'vitepress';
import './style/vars.css';
import replace from './replace';

export default defineConfig({
  title: 'Sheweny.js',
  description: 'Powerful framework for Discord.js',
  lastUpdated: true,
  markdown: {
    config(md) {
      md.use(replace);
    },
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Documentation', link: '/docs/' },
      { text: 'GitHub', link: 'https://github.com/Sheweny/framework' },
    ],
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/qgd85nEf5a' },
      { icon: 'github', link: 'https://github.com/Sheweny/framework' },
    ],
    sidebar: {
      '/docs/': [
        {
          text: 'Home',
          items: [{ text: 'Home', link: '/docs/index.md' }],
        },
        {
          text: 'Client',
          items: [
            { text: 'ShewenyClient', link: '/docs/client/ShewenyClient.md' },
            { text: 'ClientUtil', link: '/docs/client/ClientUtil.md' },
          ],
        },
        {
          text: 'Managers',
          items: [
            { text: 'ButtonsManager', link: '/docs/managers/ButtonsManager.md' },
            { text: 'CommandsManager', link: '/docs/managers/CommandsManager.md' },
            { text: 'EventsManager', link: '/docs/managers/EventsManager.md' },
            { text: 'InhibitorsManager', link: '/docs/managers/InhibitorsManager.md' },
            { text: 'ModalsManager', link: '/docs/managers/ModalsManager.md' },
            { text: 'SelectMenusManager', link: '/docs/managers/SelectMenusManager.md' },
          ],
        },
        {
          text: 'Structures',
          items: [
            { text: 'Button', link: '/docs/structures/Button.md' },
            { text: 'Command', link: '/docs/structures/Command.md' },
            { text: 'Event', link: '/docs/structures/Event.md' },
            { text: 'Inhibitor', link: '/docs/structures/Inhibitor.md' },
            { text: 'Modal', link: '/docs/structures/Modal.md' },
            { text: 'SelectMenu', link: '/docs/structures/SelectMenu.md' },
          ],
        },
        {
          text: 'Other',
          items: [
            { text: 'ShewenyError', link: '/docs/other/ShewenyError.md' },
            { text: 'ShewenyInformation', link: '/docs/other/ShewenyInformation.md' },
            { text: 'ShewenyWarning', link: '/docs/other/ShewenyWarning.md' },
          ],
        },
        {
          text: 'Typedef',
          items: [
            { text: 'ButtonOptions', link: '/docs/typedef/ButtonOptions.md' },
            { text: 'CommandOptions', link: '/docs/typedef/CommandOptions.md' },
            { text: 'EventOptions', link: '/docs/typedef/EventOptions.md' },
            { text: 'InhibitorOptions', link: '/docs/typedef/InhibitorOptions.md' },
            { text: 'ModalOptions', link: '/docs/typedef/ModalOptions.md' },
            { text: 'SelectMenuOptions', link: '/docs/typedef/SelectMenuOptions.md' },
            { text: 'ManagerOptions', link: '/docs/typedef/ManagerOptions.md' },
            { text: 'ManagersDefaultOptions', link: '/docs/typedef/ManagersDefaultOptions.md' },
            { text: 'ShewenyClientCollections', link: '/docs/typedef/ShewenyClientCollections.md' },
            { text: 'ShewenyClientCooldowns', link: '/docs/typedef/ShewenyClientCooldowns.md' },
            { text: 'ShewenyClientManagers', link: '/docs/typedef/ShewenyClientManagers.md' },
            { text: 'ShewenyClientOptions', link: '/docs/typedef/ShewenyClientOptions.md' },
          ],
        },
      ],
      '/guide/': [
        {
          text: 'Guide',
          items: [{ text: 'Home', link: '/guide/index.md' }],
        },
        {
          text: 'Getting started',
          items: [
            { text: 'Start', link: '/guide/getting-started/Start.md' },
            { text: 'Project structure', link: '/guide/getting-started/ProjectStructure.md' },
            { text: 'Client', link: '/guide/getting-started/Client.md' },
          ],
        },
        {
          text: 'CLI',
          items: [
            { text: 'Installation', link: '/guide/cli/Installation.md' },
            { text: 'Usage', link: '/guide/cli/Usage.md' },
          ],
        },
        {
          text: 'Managers',
          items: [
            { text: 'Buttons', link: '/guide/managers/buttons.md' },
            { text: 'Commands', link: '/guide/managers/commands.md' },
            { text: 'Events', link: '/guide/managers/events.md' },
            { text: 'Inhibitors', link: '/guide/managers/inhibitors.md' },
            { text: 'Modals', link: '/guide/managers/modals.md' },
            { text: 'SelectMenus', link: '/guide/managers/selectMenus.md' },
          ],
        },
        {
          text: 'Structures',
          items: [
            { text: 'Button', link: '/guide/structures/Button.md' },
            { text: 'Command', link: '/guide/structures/Command.md' },
            { text: 'Event', link: '/guide/structures/Event.md' },
            { text: 'Inhibitor', link: '/guide/structures/Inhibitor.md' },
            { text: 'Modal', link: '/guide/structures/Modal.md' },
            { text: 'SelectMenu', link: '/guide/structures/SelectMenu.md' },
          ],
        },
        {
          text: 'Topics',
          items: [
            { text: 'Best pratices', link: '/guide/topics/BestPratices.md' },
            { text: 'Updating from V1 to V2', link: '/guide/topics/V1-V2.md' },
            { text: 'Updating from V2 to V3', link: '/guide/topics/V2-V3.md' },
          ],
        },
        {
          text: 'Changelogs',
          items: [
            { text: 'Changelog 1', link: '/guide/changelogs/Changelog-1.md' },
            { text: 'Changelog 2', link: '/guide/changelogs/Changelog-2.md' },
            { text: 'Changelog 3', link: '/guide/changelogs/Changelog-3.md' },
            { text: 'Changelog 4', link: '/guide/changelogs/Changelog-4.md' },
          ],
        },
      ],
    },
  },
});
