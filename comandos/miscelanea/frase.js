const Discord = require("discord.js");
const Usuario = require("../../database/models/User.js")

module.exports.run = async (bot, message, args) => { 
const frase = args.join(" ");
  Usuario.update({ frase: frase }, { where: { idd: message.author.id }});
  
  message.channel.send(`Nova frase definida! Sua nova frase é: ${frase}`);
}

module.exports.help = {
  name: "frase",
  aliases: ["msg"],
  category: "Miscelanea",
  description: "Edite a frase do seu perfil",
  usage: "frase (frase)",
  adm: "false"
};