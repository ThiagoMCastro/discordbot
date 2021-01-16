const Discord = require("discord.js");
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "mYLJyxvzsg",
  password: "tln6YcZ3ki",
  database: "mYLJyxvzsg"
});
module.exports.run = async (bot, message, args) => {
  // And we get the bot to say the thing:
  if (message.mentions.users.first()) {
    var user = message.mentions.users.first();
  } else {
    var user = message.author;
  }
  var image = user.avatarURL;
  con.query(`SELECT * FROM users ORDER BY money DESC LIMIT 5`, function(
    err,
    result,
    fields
  ) {
    if (result.length === 0) {
      message.channel.send("Não há usuários no rank :(");
    } else {
      const embed = {
        title: `Os Mais Ricos`,
        url: "",
        color: 4886754,
        fields: []
      };
      result.forEach(result => {
        var iduser = result.idd;
        var nome = bot.users.get(iduser).username 

;
      embed.fields.push(
        {
          name: `${nome}`,
          value: `**Dinheiro:** ${result.money}`,
          inline: "false"
        }
      )
    })
      message.channel.send({ embed: embed })
      .then(function (message) {
              message.react("➡️")
            }).catch(function() {
              //Something
             });
    }
  });
};

module.exports.help = {
  name: "ranking",
  aliases: ["rank", "top", "topsonhos"],
  category: "Economia",
  description: "Vejas os mais ricos do servidor.",
  usage: "rank",
  adm: "false"
};