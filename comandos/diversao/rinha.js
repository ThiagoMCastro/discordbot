const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const Usuario = require("../../database/models/User.js");
const imgur = require("imgur");

module.exports.run = async (bot, message, args) => {
  if(!message.mentions.users.first() || !message.mentions.users.last()) return message.channel.send("Mencione 2 usuários!");
  if(message.mentions.users.first() && message.mentions.users.first()){
    var primeiro = message.mentions.users.first();
    var segundo = message.mentions.users.last();
    var image = `${primeiro.avatarURL}`;
    var image2 = `${segundo.avatarURL}`
  }
  imgur
    .uploadUrl(image)
  const { body: b } = await snekfetch.get("https://www.dm.com.br/wp-content/uploads/2018/06/2-21.jpg");
  const bolso = await Canvas.loadImage(b);
  const { body: f } = await snekfetch.get(image);
  const foto = await Canvas.loadImage(f);
  const { body: d } = await snekfetch.get(image2);
  const foto2 = await Canvas.loadImage(d);
  const canvas = Canvas.createCanvas(580,499);
  const ctx = canvas.getContext("2d");
  //fundo
  
  ctx.drawImage(bolso, 0, 0, 580, 499)
  ctx.drawImage(foto, 110, 82, 100, 100)
  ctx.drawImage(foto2, 298, 44, 100, 100)
  ctx.fillStyle = "#FF0000"
  ctx.font = "bold 43px Arial";
  ctx.fillText("BRIGUEM DESGRAÇADOS", 15, 446);
  const Ibagem = new Discord.Attachment(
    canvas.toBuffer(),
    `${message.author.username}-card.png`
  );
  message.channel.send(Ibagem);
};

module.exports.help = {
  name: "rinha",
  aliases: ["briga", "briguem"],
  permission: "",
  category: "Diversão",
  description: "Briguem desgraçados!",
  usage: "rinha @alguem @outroalguem"
};