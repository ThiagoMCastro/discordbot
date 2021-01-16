const Discord = require("discord.js");
const moment = require('moment')

moment.locale('pt-br')

module.exports.run = async (bot, message, args) => {
    const inline = true
    const botAvatar = bot.user.displayAvatarURL
    const date = bot.user.createdAt
    const userName = bot.user.username
    const servsize = bot.guilds.size
    const usersize = bot.users.size
    const comando = bot.commands.size
    const status = {
      online: '`💚` Online',
      offline: '`⚫` Offline'
    }

    const embed = new Discord.RichEmbed()
      .setColor(4886754)
      .setThumbnail(botAvatar)
      .setAuthor('🤖 Minhas informações')
      .addField('**Meu nick**', userName)
      .addField('**Meu ID**', bot.user.id)
      .addField('**Servidores**', `${servsize}`, true)
      .addField('**Usuários**', `${usersize}`, inline)
      .addField('**Comandos**', `${comando}`, inline)
      .addField('**Criado em**', formatDate('DD/MM/YYYY, às HH:mm:ss', date))
      .setFooter(`2020 © ${bot.user.username}.`)
      .setTimestamp()

    if (bot.user.presence.status) {
      embed.addField(
        '**Status**',
        `${status[bot.user.presence.status]}`,
        inline,
        true
      )
    }

    message.channel.send(embed)
};

module.exports.help = {
  name: "botinfo",
  aliases: ["infobot"],
  permission: "",
  category: "Informações",
  description: "Informações do bot",
  usage: "botinfo",
};
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}