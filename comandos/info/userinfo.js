const Discord = require("discord.js");
const moment = require('moment')
moment.locale('pt-br')

module.exports.run = async (bot, message, args) => {
    const inline = true
    const status = {
      online: ' `💚` Online',
      idle: ' `🌙` Ausente',
      dnd: ' `🔴` Não pertubar',
      offline: ' `⚪` Offline'
    }

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member
    const target = message.mentions.users.first() || message.author
    const robo = member.user.bot ? '`🤖` Sim' : ' `🙂` Não'

    const embed = new Discord.RichEmbed()
      .setThumbnail((target.displayAvatarURL))
      .setColor(4886754)
      .setAuthor('🔍 Informações do usuário')
      .addField('**Tag**', `${member.user.tag}`, inline)
      .addField('**ID**', member.user.id, inline)
      .addField('**Nickname**', `${member.nickname !== null ? `${member.nickname}` : 'Nenhum'}`, true)
      .addField('**Bot**', `${robo}`, inline, true)
      .addField('**Status**', `${status[member.user.presence.status]}`, inline, true)
      .addField('**Jogando**', `${member.user.presence.game ? `${member.user.presence.game.name}` : ' Nada'}`, inline, true)
      .addField('**Cargos**', `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(' **|** ') || 'Nenhum cargo'}`, true)
      .addField('**Entrou no Discord em**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.user.createdAt))
      .addField('**Entrou no servidor em**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.joinedAt))
      .setTimestamp()
    message.channel.send(embed)
};

module.exports.help = {
  name: "userinfo",
  aliases: ["usuario"],
  permission: "",
  category: "Informações",
  description: "Informações do Usuário!",
  usage: "userinfo (usuario)",
};
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}