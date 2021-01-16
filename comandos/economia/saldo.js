const Discord = require("discord.js");
const Usuario = require("../../database/models/User.js")

module.exports.run = async (bot, message, args) => {
  // And we get the bot to say the thing:
  if (message.mentions.users.first()) {
    var user = message.mentions.users.first();
  } else {
    var user = message.author;
  }
  let profile = await Usuario.findOne({ where: { idd: user.id}}).catch(err => console.log(err));
  var image = user.avatarURL;
 
    if (!profile) {
      message.channel.send("Este usuário nao está em minha database :(");
    } else {
      const embed = {
        title: `Saldo de **${user.username}**`,
        url: "",
        color: 4886754,
       
        thumbnail: {
          url: `${user.avatarURL}`
        },
        author: {
          name: ``,
          url: "",
          icon_url: message.author.avatarURL
        },
        fields: [
          {
            name: "<a:dinheiro:700910559197003786> Dinheiro",
            value: `$${profile.money}`,
            inline: true
          }
        ]
      };

      message.channel.send({ embed: embed });
    }
};

module.exports.help = {
  name: "saldo",
  aliases: ["money", "dinheiro"],
  category: "Economia",
  description: "Veja o saldo de alguem, ou o seu.",
  usage: "saldo",
  adm: "false"
};