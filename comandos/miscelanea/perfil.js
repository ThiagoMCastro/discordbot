const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const Usuario = require("../../database/models/User.js");
const perfil = require("./perfis/perfis.js")
const splashy = require("splashy");
const drawMultilineText = require('canvas-multiline-text')
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
  let profile = await getUser(target.id).catch(
    err => console.log(err)
  );
  if(!profile) return Usuario.create({idd: target.id, money: 1000});
  const { body: a } = await snekfetch.get(target.avatarURL);
  const avatar = await Canvas.loadImage(a);
  const { body: c } = await snekfetch.get(profile.cover);
  const capa = await Canvas.loadImage(c);
  const { body: lu } = await snekfetch.get("https://i.imgur.com/PrmRmuN.png");
  const lupa = await Canvas.loadImage(lu);
  const palette = await splashy(a);
  const canvas = Canvas.createCanvas(1000, 700);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(capa, 0, -70, 1000, 800)
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 363, 1000, 700);
  ctx.fillStyle = "#181818";
  
  ctx.fillRect(0, 265, 1000, 197);
  
  ctx.font = "33pt Arial";
  // Set the colour to white, since we have a dark background for all the text boxes.
  ctx.fillStyle = "#FFFFFF";
  // Add the name variable.
  ctx.fillText(target.username, 210, 325);
  ctx.fillStyle = "#cccccc";
  ctx.font = "17pt Arial";
  ctx.fillText(`R$${convert(profile.money)} Reais`, 210, 360);
  ctx.font = "15pt Arial";
  ctx.fillText(`INÍCIO`, 97, 440);
  ctx.fillText(`VÍDEOS`, 222, 440);
  ctx.fillText(`PLAYLISTS`, 369, 440);
  ctx.fillText(`COMUNIDADE`, 536, 440);
  ctx.fillText(`CANAIS`, 691, 440);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`SOBRE`, 819, 440);
  ctx.fillRect(815, 455, 80, 3);
  ctx.drawImage(lupa, 934, 417, 31, 31);
  ctx.font = "20pt Arial";
  ctx.fillText(`Descrição`, 70, 510);
  ctx.fillText(`Estatísticas`, 675, 510);
  ctx.font = "12pt Arial";

  ctx.fillText(
    `Inscreveu-se em ${formatDate("DD de", target.createdAt)} ${monthNames[target.createdAt.getMonth()]} ${formatDate("de YYYY", target.createdAt)}`,
    675,
    565
  );
  ctx.fillText(
    `${profile.xp}/500 de Experiências`,
    675,
    606
  );
  ctx.fillText(
    `${profile.lvl} Níveis`,
    675,
    650
  );
  ctx.fillStyle = "#232323";
  ctx.fillRect(675, 530, 350, 2);
  ctx.fillRect(675, 579, 350, 2);
  ctx.fillRect(675, 619, 350, 2);
  ctx.fillRect(675, 669, 350, 2);
  ctx.fillStyle = "#FFFFFF";
  //ctx.fillText(`${profile.frase}`, 70, 560);
  ctx.fillStyle = "#ffffff";
  drawMultilineText(
    canvas.getContext('2d'),
    profile.frase,
    {
        rect: {
            x: 70,
            y: 530,
            width: 594,
            height: 581
        },
        font: 'Arial',
        verbose: true,
        lineHeight: 1.4,
        minFontSize: 20,
        maxFontSize: 28
    })
  ctx.arc(127, 340, 60, 0, 2 * Math.PI);
  ctx.fill();
  ctx.clip();
  ctx.drawImage(avatar, 60, 270, 130, 130);
  const Ibagem = new Discord.Attachment(
    canvas.toBuffer(),
    `${target.username}-card.png`
  );
  message.channel.send(Ibagem);
  
};

module.exports.help = {
  name: "perfil",
  aliases: ["profile"],
  category: "Miscelanea",
  description: "Mostra suas informações",
  usage: "perfil",
  adm: "false"
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

function getUser(id) {
  return Usuario.findOne({ where: { idd: id } })
}