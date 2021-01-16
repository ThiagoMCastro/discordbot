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
  const { body: b } = await snekfetch.get("https://i.imgur.com/RXHLTui.png");
  const pisei = await Canvas.loadImage(b);
  const { body: f } = await snekfetch.get(image);
  const foto = await Canvas.loadImage(f);
  
  const canvas = Canvas.createCanvas(552,667);
  const ctx = canvas.getContext("2d");
  //fundo
  
  
  ctx.drawImage(foto, 47, 59, 172, 232)
  ctx.drawImage(pisei, 0, 0, 552, 667)
  const Ibagem = new Discord.Attachment(
    canvas.toBuffer(),
    `${message.author.username}-bob.png`
  );
  message.channel.send(Ibagem);
};

module.exports.help = {
  name: "bobeira",
  aliases: ["bob", "bobesponja"],
  permission: "",
  category: "Diversão",
  description: "Bobeira!",
  usage: "bobeira (anexe uma imagem)"
};