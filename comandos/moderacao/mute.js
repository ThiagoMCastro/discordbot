const Discord = require("discord.js");
const Usuario = require("../../database/models/User.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
   let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.id === "700767305956851763") return message.reply("Não vou silenciar meu dono!");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nao posso mutar essa pessoinha");
  
  let muterole = message.guild.roles.find(`name`, "Silenciado");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Silenciado",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Você nao especificou o tempo!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> foi mutado(a) por ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> foi desmutado(a)!`);
  }, ms(mutetime));
};

module.exports.help = {
  name: "mute",
  aliases: ["mutar", "silenciar"],
  category: "Moderação",
  description: "Silencie aquele chatão do servidor.",
  usage: "mute @usuario 1m/h/d",
  adm: "true"
};