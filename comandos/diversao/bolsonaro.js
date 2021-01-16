const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const Usuario = require("../../database/models/User.js");
const imgur = require("imgur");

module.exports.run = async (bot, message, args) => {
  if (message.attachments.size > 0) {
    var attachement_image = message.attachments.first();
    var image = attachement_image.url;
  } 
  
  if(message.attachments.size < 1 && !message.mentions.users.first()){
    var image = args[0];
  }
  if(message.mentions.users.first()){
    var target = message.mentions.users.first();
    var image = `${target.avatarURL}`;
  }
  
  imgur
    .uploadUrl(image)
  const { body: b } = await snekfetch.get("http://i.imgur.com/t2JQzJF.png");
  const bolso = await Canvas.loadImage(b);
  const { body: f } = await snekfetch.get(image);
  const foto = await Canvas.loadImage(f);
  
  const canvas = Canvas.createCanvas(467,300);
  const ctx = canvas.getContext("2d");
  //fundo
  ctx.drawImage(foto, 125, 13, 344, 224)
  ctx.drawImage(bolso, 0, 0, 467, 300)
  const Ibagem = new Discord.Attachment(
    canvas.toBuffer(),
    `${message.author.username}-card.png`
  );
  message.channel.send(Ibagem);
};

module.exports.help = {
  name: "bolsonaro",
  aliases: ["bolso", "bolsomito"],
  permission: "",
  category: "Diversão",
  description: "O que o Bolsonaro está vendo na tv?",
  usage: "bolsonaro (anexe uma imagem)"
};