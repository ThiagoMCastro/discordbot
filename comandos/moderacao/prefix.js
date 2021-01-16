const Discord = require("discord.js");
const guildConf = require("../../guildconfig.json")
const config = require("../../config.json")
module.exports.run = async (bot, message, args) => {
       if(!args[0]) return message.channel.send(`O prefixo deste servidor é *${guildConf[message.guild.id].prefix}*.`)
      guildConf[message.guild.id].prefix = args[0];
      if (!guildConf[message.guild.id].prefix) {
        guildConf[message.guild.id].prefix = config.prefix; // If you didn't specify a Prefix, set the Prefix to the Default Prefix
      }
      message.channel.send(`Prefixo: ${guildConf[message.guild.id].prefix}`)
};

module.exports.help = {
  name: "prefix",
  aliases: ["prefixo"],
  permission: "ADMINISTRATOR",
  category: "Moderação",
  description: "Mude o prefixo do servidor.",
  usage: "prefix (algum prefixo)",
};