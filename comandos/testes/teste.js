const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const Usuario = require("../../database/models/User.js");
const drawMultilineText = require('canvas-multiline-text')
const splashy = require("splashy");
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
module.exports.run = async (bot, message, args) => {
  let target;
  if (message.mentions.users.first()) {
    target = message.mentions.users.first();
  } else {
    target = message.author;
  }
  if(!target.avatarURL) return message.channel.send("Você nao tem foto de perfil, infelizmente!")
  let profile = await Usuario.findOne({ where: { idd: target.id } }).catch(
    err => console.log(err)
  );
  if(!profile) return Usuario.create({idd: target.id, money: 1000});
  const { body: a } = await snekfetch.get(target.avatarURL);
  const avatar = await Canvas.loadImage(a);
  const { body: c } = await snekfetch.get(profile.cover);
  const capa = await Canvas.loadImage(c);
  const palette = await splashy(a);
  
  //fonte
  Canvas.registerFont('assets/09b8d262-63e5-40d7-b27b-007405a9c5b2%2FBebasNeue-Regular.ttf?v=1588566556801', { family: 'bebas' });
  
  const canvas = Canvas.createCanvas(1000, 625);
  const ctx = canvas.getContext("2d");
  //fundo
  ctx.drawImage(capa, 0, -100, 1000, 800)
  ctx.fillStyle = "#212121";
  ctx.fillRect(0, 301, 716, 374);
  ctx.fillStyle = palette[0]
  ctx.fillRect(0, 373, 1000, 625);
  
  ctx.fillStyle = "#c5c5c5";
  ctx.fillRect(0, 386, 1000, 625);
  //premium tag
  
  //foto de perfil
  ctx.save();
  ctx.arc(822, 374, 120, 0, 2 * Math.PI);
  ctx.lineWidth = 15;
  ctx.strokeStyle = palette[0];
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(avatar, 677, 229, 300, 300)
  ctx.restore();
  const Ibagem = new Discord.Attachment(
    canvas.toBuffer(),
    `${target.username}-card.png`
  );
  message.channel.send(Ibagem);
};

module.exports.help = {
  name: "teste",
  aliases: ["canajeitava", "arrumar"],
  permission: "",
  category: "Testes",
  description: "Descricao",
  usage: "canva (alguma coisa)"
};
function convert(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}


function formatDate(template, date) {
  var specs = "YYYY:MM:DD:HH:mm:ss".split(":");
  
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce(function(template, item, i) {
      return template.split(specs[i]).join(item);
    }, template);
}
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}