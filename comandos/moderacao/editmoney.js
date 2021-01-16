const Discord = require("discord.js");
const Usuario = require("../../database/models/User.js")
const config = require("../../config.json")
module.exports.run = async (bot, message, args) => {
let user;
let dim;
  // And we get the bot to say the thing:
    if(message.author.bot) return;
    
    if(!message.member.id === config.ownerID) return message.channel.send("Você não tem permissão!")
    if(!args[0] || !args[1]) return message.channel.send("Coloque um usuario e uma quantia válida!")
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
      dim = args[1];
    } else {
      
    }    
      await Usuario.update({ money: args[1] }, { where: { idd: user.id }});
      message.channel.send(`O dinheiro de ${user} foi alterado para ${args[1]}`);
    
};

module.exports.help = {
  name: "editmoney",
  aliases: ["editar"],
  permission: "ADMINISTRATOR",
  category: "Moderação",
  description: "Editar dinheiro de um usuario",
  usage: "editmoney (usuario) (dinheiro)",
};
