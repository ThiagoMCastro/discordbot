const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = {
  "title": "Olá, eu sou o Dixon!",
  "description": "Olá! Eu sou um robôzinho bastante esperto :D\nMeu prefixo é '__**d.**__'\n Exemplo: d.info",
  "color": 4886754,
  "thumbnail": {
    "url": bot.user.avatarURL
  },
  "fields": [
    {
      "name": "Mas o quê você faz?",
      "value": "Eu faço algumas coisas, você consegue ver tudo utilizando o comando **d.ajuda** ou **d.help**"
    },
    {
      "name": "Tirando a parte dos comandos, você tem o quê?",
      "value": "Tenho uma economia única, ou seja, tenho meu próprio 'coin' :)"
    },
    {
      "name": "Quem teve a brilhante ideia de te produzir?",
      "value": "Um carinha aí, ele parece muito com o  <@700767305956851763>"
    }
  ]
};
  message.channel.send({embed: embed})    
}

module.exports.help = {
  name: "info",
  aliases: ["sobre"],
  category: "Informações",
  description: "Informações importantes",
  usage: "info",
  adm: "false"
};