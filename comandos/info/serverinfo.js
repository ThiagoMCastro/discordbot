const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const date = message.guild.createdAt
    const joined = message.member.joinedAt

    const region = {
      brazil: ':flag_br: Brazil'
    }
    
    const embed = new Discord.RichEmbed()
      .setColor(4886754)
      // .setThumbnail(message.guild.iconURL)
      .setTitle(message.guild.name)
      .setThumbnail(message.guild.iconURL)
      .addField('**🏛️ Nome**', message.guild.name, true)
      .addField('**ℹ️ ID**', message.guild.id, true)
      .addField('**👑 Dono(a)**', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
      .addField('**🌎 Região**', region[message.guild.region], true)
      .addField('**👥 Humanos**', `${message.guild.members.filter(member => !member.user.bot).size}`, true)
      .addField('**🤖 Bots**', `${message.guild.members.filter(member => member.user.bot).size}`, true)
      .addField('**🗂️ Canais**', message.guild.channels.size, true)
      .addField('**🎴 Cargos**', message.guild.roles.size, true)
      .addField('**📆 Criado em**', formatDate('DD/MM/YYYY, às HH:mm:ss', date), true)
      .addField('**🌟 Você entrou em**', formatDate('DD/MM/YYYY, às HH:mm:ss', joined), true)
      .setTimestamp()

    // Aqui sera enviado o embed no canal que o usuário executo o comando
    message.channel.send(embed)
};

module.exports.help = {
  name: "serverinfo",
  aliases: ["servidor"],
  permission: "",
  category: "Informações",
  description: "Informações do Servidor!",
  usage: "serverinfo",
};
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}