const Discord = require("discord.js");
const config = require("../../config.json")
module.exports.run = async (bot, message, args) => {
       if (!message.member) return

      if (!message.member.id === "700767305956851763" && !message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('você não tem permissão para usar esse comando!')

      var limit = 200
      if (args.length === 1) {
        limit = parseInt(args[0])
      } else {
        return message.reply(`determine uma quantidade de mensagens para serem excluídas: \`\`\`fl.${module.exports.help.usage}\`\`\``)
      }

      if (!Number.isInteger(limit)) return message.reply(`determine uma quantidade entre 1 a 200! \`\`\`fl.${module.exports.help.usage}\`\`\``)

      limit = Math.min(limit, 99)

      message.channel.bulkDelete(limit)
        .then(messages => {
          message.channel.send(`${messages.size} mensagens foram deletadas!`)
            .then(message => setTimeout(() => message.delete(), 2000))
        })
};

module.exports.help = {
  name: "clear",
  aliases: ["limpar", "limparchat", "lc"],
  permission: "MANAGE_MESSAGES",
  category: "Moderação",
  description: "Limpa a devida quantidade de mensagens!",
  usage: "clear (1-100)",
};