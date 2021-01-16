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
  if(target.id === bot.user.id) return message.channel.send("Está indo contra as diretrizes do bot. Repita, e seja banido de usar minhas funções.")
  imgur
    .uploadUrl(image)
  const { body: b } = await snekfetch.get("https://i.imgur.com/4h6TsvC.png");
  const pisei = await Canvas.loadImage(b);
  const { body: f } = await snekfetch.get(image);
  const foto = await Canvas.loadImage(f);
  
  const canvas = Canvas.createCanvas(189,267);
  const ctx = canvas.getContext("2d");
  //fundo
  
  ctx.drawImage(pisei, 0, 0, 189, 267)
  ctx.drawImage(foto, 63, 174, 52, 52)
  const Ibagem = new Discord.Attachment(
    canvas.toBuffer(),
    `${message.author.username}-merda.png`
  );
  message.channel.send(Ibagem);
};

module.exports.help = {
  name: "merda",
  aliases: ["piseinamerda", "pisei"],
  permission: "",
  category: "Diversão",
  description: "Droga!",
  usage: "piseinamerda (anexe uma imagem)"
};