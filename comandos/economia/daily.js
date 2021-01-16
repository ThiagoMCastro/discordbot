const Discord = require("discord.js");
const ms = require('parse-ms')
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "mYLJyxvzsg",
  password: "tln6YcZ3ki",
  database: "mYLJyxvzsg"
});
module.exports.run = async (bot, message, args) => {
    let timeout = 86400000 // 24 hours in milliseconds, change if you'd like.
    let amount = Math.floor(Math.random() * 180) + 150;
    // random amount: Math.floor(Math.random() * 1000) + 1;

    con.query(`SELECT * FROM users WHERE idd = ${message.author.id}`, function(err, result, fields) {
      let daily = result[0].daily;
    
    

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.channel.send(`Você ja coletou sua recompensa diária! Colete novamente em **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    } else {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Daily`, message.author.displayAvatarURL)
    .setColor("GREEN")
    .setDescription(`**Recompensa diária!!!**`)
    .addField(`Coletado`, amount)

      con.query(`UPDATE users SET money=money+${amount}, daily=${Date.now()} WHERE idd = ${message.author.id}`);
      message.channel.send({embed: embed});
    }
      });
};

module.exports.help = {
  name: "daily",
  aliases: ["diario"],
  category: "Economia",
  description: "Pegue seu premio diario hoje mesmo!",
  usage: "daily",
  adm: "false"
};
