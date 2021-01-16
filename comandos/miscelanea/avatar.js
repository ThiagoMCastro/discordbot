const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setColor(4886754)
        .setAuthor(user.username)
        .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
};

module.exports.help = {
  name: "avatar",
  aliases: ["foto", "imagem"],
  permission: "",
  category: "Miscelanea",
  description: "Veja a imagem de alguém.",
  usage: "avatar (alguem)",
};