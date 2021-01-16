const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  if (message.mentions.users.first()) {
    var user = message.mentions.users.first();
  } else {
    var user = message.author;
  }
  message.channel.send(`${message.author} acaba de alimentar ${user}!`)
};

module.exports.help = {
  name: "alimentar",
  aliases: ["alimento"],
  category: "Diversão",
  description: "Alimente um staff!",
  usage: "alimentar (usuario)",
};
