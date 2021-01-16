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
  const { body: cal } = await snekfetch.get("https://i.imgur.com/Ho5nHfp.png");
  const calendario = await Canvas.loadImage(cal);
  const palette = await splashy(a);
  
  //fonte
  Canvas.registerFont('assets/09b8d262-63e5-40d7-b27b-007405a9c5b2%2FBebasNeue-Regular.ttf?v=1588566556801', { family: 'bebas' });
  
  const canvas = Canvas.createCanvas(600, 450);
  const ctx = canvas.getContext("2d");
   //capa
  ctx.fillStyle = "#007fff";
  ctx.drawImage(capa, 0, -30, 600, 456);
  //fundo
  ctx.fillStyle = "#15202b";
  ctx.fillRect(0, 202, 600, 450);
 
  //foto d perfil
  ctx.save();
  ctx.arc(83, 193, 70, 0, 2 * Math.PI);
  ctx.lineWidth = 15;
  ctx.strokeStyle = "#15202b";
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(avatar, 14, 122, 141, 141)
  ctx.restore();
  //nome
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 24px Arial";
  var usuari = ctx.fillText(target.username, 10, 290);
  //usuario
  ctx.fillStyle = "#8899a6"
  ctx.font = "20px Arial";
  ctx.fillText("@"+target.tag.replace(/\s+/g, '_'), 10, 315);
  //frase
  ctx.fillStyle = "#FFFFFF"
  
  //ingressou
  ctx.fillStyle = "#8899a6"
  ctx.drawImage(calendario, 10, 385, 30, 30);
  ctx.fillText(`Ingressou em ${monthNames[target.createdAt.getMonth()]} ${formatDate("de YYYY", target.createdAt)}`, 50, 407);
  //seguindo
  ctx.fillText(`dinheiro`, 10, 430);
  ctx.fillText(`experiências`, 225, 430);
  //numeros
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 20px Arial"
  ctx.fillText(`${convert(profile.money)}`, 97, 430)
  ctx.fillText(`${profile.xp}`, 190, 430)
  //seguir
  ctx.fillStyle = "#15202b";
  roundRect(ctx, 485, 232, 100, 50, 20, true);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#007fff";
  ctx.stroke();
  ctx.fillStyle = "#007fff";
  ctx.font = "bold 26px Arial";
  ctx.fillText("Seguir", 497, 265);
  ctx.fillStyle = "#ffffff";
  drawMultilineText(
    canvas.getContext('2d'),
    profile.frase,
    {
        rect: {
            x: 10,
            y: 320,
            width: 580,
            height: 5
        },
        font: 'Arial',
        verbose: true,
        lineHeight: 1.4,
        minFontSize: 16,
        maxFontSize: 20
    })
  const Ibagem = new Discord.Attachment(
    canvas.toBuffer(),
    `${target.username}-card.png`
  );
  message.channel.send(Ibagem);
};

module.exports.help = {
  name: "card",
  aliases: ["canva", "cv"],
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