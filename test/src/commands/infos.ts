import { ApplicationCommand, ShewenyClient } from "../../../";
import { MessageEmbed } from "discord.js";
import moment from "moment";
import type { CommandInteraction, Role } from "discord.js";

export class InfosCommand extends ApplicationCommand {
  public client: ShewenyClient;
  constructor(client: ShewenyClient) {
    super(
      client,
      {
        name: "infos",
        description: "Get informations",
        options: [
          {
            name: "user",
            description: "Allows to have information about a user.",
            type: "SUB_COMMAND",
            options: [
              {
                name: "user",
                description: "User to get infos",
                type: "STRING",
                required: true,
              },
            ],
          },
          {
            name: "bot",
            description: "Allows to have information about bot.",
            type: "SUB_COMMAND",
          },
          {
            name: "server",
            description: "Allows to have information about server.",
            type: "SUB_COMMAND",
          },
          {
            name: "role",
            description: "Allows to have information about role.",
            type: "SUB_COMMAND",
            options: [
              {
                name: "role",
                description: "Role to get infos",
                type: "STRING",
                required: true,
              },
            ],
          },
          {
            name: "channel",
            description: "Allows to have information about channel.",
            type: "SUB_COMMAND",
            options: [
              {
                name: "channel",
                description: "Channel to get infos",
                type: "STRING",
                required: true,
              },
            ],
          },
        ],
      },
      {
        category: "Misc",
      }
    );
    this.client = client;
  }
  async execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand(false)) {
      case "user":
        const argUser = interaction.options.get("user")?.value;
        const userInfo = await this.client.resolve!.resolveMember(
          interaction.guild!,
          argUser as string
        );
        if (!userInfo) {
          this.client.users
            .fetch(interaction.options.get("user")?.value as string)
            .then((u) => {
              let BOTSTATUS;
              if (!u) return interaction.reply(`User not found.`);
              if (u.bot) BOTSTATUS = "yes";
              else BOTSTATUS = "no";
              const embedUser = new MessageEmbed()
                .setAuthor(`${u.username}#${u.discriminator}`, `${u.displayAvatarURL()}`)
                .setColor("#047291")
                .setThumbnail(u.displayAvatarURL())
                .addField(`\u200b`, `BOT : ${BOTSTATUS}`)
                .setDescription("This user is no on the server.")
                .setFooter(`User ID : ${u.id}`);
              return interaction.reply({ embeds: [embedUser] });
            })
            .catch(() => interaction.reply(`User not found.`));
          break;
        } else {
          //if (use.user.presence.status === 'online') status = `${this.spiritus.emojis.ONLINE}Online`  ;
          //if (use.user.presence.status === 'idle') status = `${this.spiritus.emojis.IDLE}Idle`;
          //if (use.user.presence.status === 'dnd') status = `${this.spiritus.emojis.DND}Dnd`;
          //if (use.user.presence.status === 'offline') status = `${this.spiritus.emojis.OFFLINE}Offline`;
          //if (use.user.presence.clientStatus != null && use.user.presence.clientStatus.desktop === 'online') plateforme = '🖥️ Ordinateur'
          //if (use.user.presence.clientStatus != null && use.user.presence.clientStatus.mobile === 'online') plateforme = '📱 Mobile'
          let permissions_arr = userInfo.permissions.toArray().join(", ");
          let permissions = permissions_arr.toString();
          permissions = permissions.replace(/\_/g, " ");
          const embedMember = new MessageEmbed();
          embedMember.setThumbnail(userInfo.user.displayAvatarURL());
          embedMember.setColor("#047291");
          embedMember.setTitle(`${userInfo.user.username}`);
          embedMember.addField("ID :", `${userInfo.user.id}`, true);
          embedMember.addField("Tag :", `${userInfo.user.tag}`, true);
          embedMember.addField(
            "Joigned :",
            `${moment.utc(userInfo.joinedAt).format("DD/MM/YYYY - hh:mm")}`,
            true
          ); //OK --------- IDLE
          embedMember.addField(
            "Account created :",
            `${moment.utc(userInfo.user.createdAt).format("DD/MM/YYYY - hh:mm")}`,
            true
          ); //
          embedMember.addField(
            "Roles :",
            `${userInfo.roles.cache.map((r: Role) => r.toString()).join("")}`
          ); //OK
          embedMember.addField(
            "User information:",
            `** Permissions:** ${
              userInfo.permissions
                .toArray()
                .sort()
                .map(
                  (permissions: string) =>
                    `${permissions
                      .split("_")
                      .map((x) => x[0] + x.slice(1).toLowerCase())
                      .join(" ")}`
                )
                .join(", ") || "none"
            }`
          ); //OK
          embedMember.setTimestamp();
          embedMember.setFooter(
            `${userInfo.user.username} ID : ${userInfo.user.id}`,
            userInfo.user.displayAvatarURL()
          ); //OK
          interaction.reply({ embeds: [embedMember] });
          break;
        }
      case "bot":
        const pck = require("../../../package.json");
        const verssionBot = pck.version;
        const verssionDjs = pck.dependencies["discord.js"];
        const embedBot = new MessageEmbed()
          .setColor("#047291")
          .setAuthor(
            `${this.client.user!.username} Info`,
            this.client.user!.displayAvatarURL()
          )
          .setThumbnail(this.client.user!.displayAvatarURL())
          .addFields(
            { name: "Developer", value: `Smaug#6739`, inline: true },
            {
              name: "Data",
              value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
              inline: true,
            },
            {
              name: "Uptime",
              value: `${Math.floor(this.client.uptime! / 1000 / 60).toString()} minutes`,
              inline: true,
            },
            {
              name: "Servers",
              value: `${this.client.guilds.cache.size.toString()}`,
              inline: true,
            },
            {
              name: "Channels",
              value: `${this.client.channels.cache.size.toString()}`,
              inline: true,
            },
            {
              name: "Users",
              value: `${this.client.guilds.cache
                .map((g) => g.memberCount)
                .reduce((a, b) => a + b)}`,
              inline: true,
            },
            { name: "Version", value: `${verssionBot}`, inline: true },
            { name: "Library ", value: `discord.js (javascript)`, inline: true },
            {
              name: "Library verssion",
              value: `${verssionDjs.replace("^", "")}`,
              inline: true,
            },
            {
              name: "Support",
              value: `[Support server](https://discord.gg/frATmymJBS)`,
              inline: true,
            },
            {
              name: "Invite :",
              value: `[Invite](https://discord.com/oauth2/authorize?client_id=877426031231901746&scope=application.commands%20bot&permissions=1946446974%20applications.commands)`,
              inline: true,
            },
            {
              name: "Website :",
              value: `[Website](https://www.sheweny.smaug-6739.com/)`,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter(
            `Infos of ${this.client.user!.username}. BOT ID : ${this.client.user!.id}`
          );
        interaction.reply({ embeds: [embedBot] });
        break;
      case "server":
        const guild_name = interaction.guild!.name;
        const owner = `<@${interaction.guild!.ownerId}>`;
        const boost = interaction.guild!.premiumSubscriptionCount;
        let boostMsg = "";
        if (!boost) boostMsg = "This server no have boost";
        else boostMsg = `Server have ${boost} boost${boost > 1 ? "s" : ""}`;
        const members = interaction.guild!.memberCount;
        // interaction.guild.members.fetch().then(fetchedMembers => {
        // const online = fetchedMembers.filter(member => member.presence.status === 'online').size;
        // const idle = fetchedMembers.filter(member => member.presence.status === 'idle').size;
        // const dnd = fetchedMembers.filter(member => member.presence.status === 'dnd').size;
        // const off = fetchedMembers.filter(member => member.presence.status === 'offline').size;
        const channel_t = interaction.guild!.channels.cache.filter(
          (channel) => channel.type === "GUILD_TEXT"
        ).size;
        const channel_v = interaction.guild!.channels.cache.filter(
          (channel) => channel.type === "GUILD_VOICE"
        ).size;
        const channel_c = interaction.guild!.channels.cache.filter(
          (channel) => channel.type === "GUILD_CATEGORY"
        ).size;
        const roles = interaction.guild!.roles.cache.size;
        const salons = interaction.guild!.channels.cache.size;
        const embedInfoGuild = new MessageEmbed();
        if (interaction.guild!.iconURL()) {
          embedInfoGuild.setAuthor(
            `${guild_name}`,
            `${interaction.guild!.iconURL() ? interaction.guild!.iconURL() : ""}`
          );
          embedInfoGuild.setThumbnail(`${interaction.guild!.iconURL()}`);
          embedInfoGuild.setFooter(
            `BOT ID : ${this.client.user!.id}`,
            `${interaction.guild!.iconURL()}`
          );
        } else {
          embedInfoGuild.setAuthor(`${guild_name}`);
          embedInfoGuild.setFooter(`BOT ID : ${this.client.user!.id}`);
        }
        embedInfoGuild.setTitle(`**Informations sur le serveur :**`);
        embedInfoGuild.setColor("#642397");
        embedInfoGuild.addFields(
          { name: "Name", value: `${guild_name}`, inline: true },
          { name: "Owner", value: `${owner}`, inline: true },
          { name: "Members", value: `${members}`, inline: true },
          { name: "Channels", value: `${salons}`, inline: true },
          { name: "Roles", value: `${roles}`, inline: true },
          {
            name: "Chanels",
            value: `Text : ${channel_t}\nVoice : ${channel_v}\nCategories : ${channel_c}`,
            inline: true,
          },
          {
            name: "Verification level",
            value: `${interaction.guild!.verificationLevel}`,
            inline: true,
          },
          {
            name: `Nitro(s) of server`,
            value: `${boostMsg}`,
            inline: true,
          }
          //{ name: 'Status des membres', value: `${this.spiritus.emojis.ONLINE}Online : ${online}\n${this.spiritus.emojis.IDLE}Idle : ${idle}\n${this.spiritus.emojis.DND}Dnd : ${dnd}\n${this.spiritus.emojis.OFFLINE}Offline : ${off}`, inline: true }
        );
        embedInfoGuild.setTimestamp();
        interaction.reply({ embeds: [embedInfoGuild] });
        //});
        break;
      case "role":
        const argRole = interaction.options.get("role")?.value;
        const role = this.client.resolve!.resolveRole(
          interaction.guild!,
          argRole as string
        );
        if (!role) return interaction.reply(`Role not found.`);
        let mention = "";
        let manager = "";
        let separation = "";
        if (role.mentionable) mention = "yes";
        else mention = "no";
        if (role.managed) manager = "yes";
        else manager = "no";
        const membersWithRole = interaction.guild!.roles.cache.get(role.id)?.members.size;
        if (role.hoist) separation = "yes";
        else separation = "no";
        const embedRole = new MessageEmbed()
          .setColor("#047291")
          .setThumbnail(
            `${interaction.guild!.iconURL() ? interaction.guild!.iconURL() : ""}`
          )
          .setAuthor(
            `Information of role :`,
            `${interaction.guild!.iconURL() ? interaction.guild!.iconURL() : ""}`
          )
          .setTitle(`${role.name}`)
          .addFields(
            { name: "Role", value: `${role}`, inline: true },
            { name: "Color", value: `${role.hexColor}`, inline: true },
            { name: "Position", value: `${role.position}`, inline: true },
            { name: "ID", value: `${role.id}`, inline: true },
            { name: "Manager :", value: `${manager}`, inline: true },
            { name: "Mention :", value: `${mention}`, inline: true },
            { name: "Members :", value: `${membersWithRole}`, inline: true },
            { name: "Separation :", value: `${separation}`, inline: true },
            {
              name: "Created at  :",
              value: `${moment.utc(role.createdTimestamp).format("DD/MM/YYYY - hh:mm")}`,
              inline: true,
            },
            {
              name: "Permissions :",
              value: `${
                role.permissions
                  .toArray()
                  .sort()
                  .map(
                    (permissions: string) =>
                      `${permissions
                        .split("_")
                        .map((x) => x[0] + x.slice(1).toLowerCase())
                        .join(" ")}`
                  )
                  .join(", ") || "none"
              }`,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter("Command module: Fun");
        interaction.reply({ embeds: [embedRole] });
        break;
      case "channel":
        const channel = this.client.resolve!.resolveChannel(
          interaction.guild!,
          interaction.options.get("channel")?.value as string
        );
        if (!channel) return interaction.reply(`Channel not found.`);
        let type = "No";
        let nsfw;
        if (channel.type === "GUILD_TEXT") type = `Text`;
        if (channel.type === "GUILD_VOICE") type = `Voice`;
        if (channel.type === "GUILD_CATEGORY") type = `Categrory`;
        if (!type) type = `Other`;
        const embedChannel = new MessageEmbed()
          .setAuthor(`Information of a channel :`, `${interaction.guild!.iconURL()}`)
          .setThumbnail(
            `${interaction.guild!.iconURL() ? interaction.guild!.iconURL() : ""}`
          )
          .setColor("#047291")
          .setTitle(`Channel : ${channel.name}`)
          .addFields(
            { name: "Channel id :", value: `${channel.id}`, inline: true },
            {
              name: "Category :",
              value: `${channel.parent ? channel.parent : "none"}`,
              inline: true,
            },
            { name: "Catégory ID :", value: `${channel.parentId}`, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
            {
              name: "Created at  :",
              value: `${moment
                .utc(channel.createdTimestamp)
                .format("DD/MM/YYYY - hh:mm")}`,
              inline: true,
            },
            { name: "Type channel:", value: `${type}`, inline: true },
            { name: "Channel NSFW :", value: `${nsfw}`, inline: true }
          )
          .setTimestamp()
          .setFooter("Command module: Fun");
        interaction.reply({ embeds: [embedChannel] });
        break;
    }
  }
}
