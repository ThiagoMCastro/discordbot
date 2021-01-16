const Discord = require("discord.js");
const snekfetch = require("node-superfetch");
const imgur = require("imgur");
const Usuario = require("../../database/models/User.js")

module.exports.run = async (bot, message, args) => {
  if (!message.attachments.size && !args[0]) return message.channel.send("Anexe uma imagem junto ao comando.");
  if (message.attachments.size > 0) {
    var attachement_image = message.attachments.first();
    var image = attachement_image.url;
  } 
  if(message.attachments.size < 1){
    var image = args[0];
  }
  imgur
    .uploadUrl(image)
    .then(function(json) {
    console.log(json.data.link)
    Usuario.update({ cover: json.data.link }, { where: { idd: message.author.id }});
    message.channel.send("Imagem atualizada! Nova imagem:" + json.data.link)
  })
    .catch(function(err) {
      console.log(err);
    });
};

module.exports.help = {
  name: "capa",
  aliases: ["cover"],
  category: "Miscelanea",
  description: "Edite a capa do seu perfil",
  usage: "capa (imagem)",
  adm: "false"
};
