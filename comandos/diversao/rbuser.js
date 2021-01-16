
const Discord = require("discord.js")
const roblox = require("noblox.js")
module.exports.run = async (bot, message, args) => {
  bot.extractDate = (dateObj) => {
        let month = dateObj.getMonth()
        let day = dateObj.getDate()
        let year = dateObj.getFullYear()
        return {
          month: month + 1,
          day: day,
          year: year
        }
      }    
  let username = args[0]
     if (username) {
       roblox.getIdFromUsername(username).then(id => { // gets user id for the specific part of the embed
         if (id) {
           roblox.getPlayerInfo(parseInt(id)).then(function(info) {
             let date = new Date(info.joinDate) // states join date
             let dateInfo = bot.extractDate(date) 
             let embed = new Discord.RichEmbed() // starts a new embed

             .setColor("#40aee4") // sets the color of the embed
             .setURL(`https://roblox.com/users/${id}/profile`) // base link, changed by the variables 'id'
             .setTimestamp()
             .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`) // gets the roblox profile picture

             .addField("Username", info.username || 'Unresolvable', true) // everything in the embed is undefined, therefore can be changed by the variables
             .addField("User ID", id || 'Unresolvable', true)
             .addField("Blurb", info.blurb || 'Nada', true)
             .addField("Status", info.status || 'Nada', true)
             .addField("Idade da Conta", `${info.age} days old` || 'Unresolvable')
             .addField("Registro", `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` || 'Unresolvable')
             .addField("Link", `https://roblox.com/users/${id}/profile`)
             .setFooter(`Familia L`, bot.user.avatarURL)
              message.channel.send({embed})
           })
         }

       }).catch(function (err) {
         message.channel.send("Esse usuário aparentemente nao existe!") // catching error
       });
    } else {
       message.channel.send("Digite um usuário do Roblox valido, Exemplo 'fl.rbuser ThiagoApks'.") 
     }
        }

module.exports.help = {
  name: "rbuser",
  aliases: ["robloxuser"],
  category: "Diversão",
  description: "Mostra informações de um usuário do Roblox.",
  usage: "rbuser",
  adm: "false"
};
