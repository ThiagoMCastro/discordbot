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
  const { body: b } = await snekfetch.get("https://i.imgur.com/e8ny3z7.png");
  const bolso = await Canvas.loadImage(b);
  const { body: f } = await snekfetch.get(image);
  const foto = await Canvas.loadImage(f);
  
  const canvas = Canvas.createCanvas(800,481);
  const ctx = canvas.getContext("2d");
  //fundo
  
  ctx.drawImage(bolso, 0, 0, 800, 481)
  ctx.drawImage(foto, 100, 151, 220, 220)
  const Ibagem = new Discord.Attachment(
    canvas.toBuffer(),
    `${message.author.username}-card.png`
  );
  message.channel.send(Ibagem);
};

module.exports.help = {
  name: "morrepraga",
  aliases: ["morrep", "morre"],
  permission: "",
  category: "Diversão",
  description: "MORRE PRAGA",
  usage: "morrepraga (anexe uma imagem)"
};