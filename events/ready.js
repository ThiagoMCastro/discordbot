const config = require("../config.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const database = require("../database/database.js")
const User = require('../database/models/User.js');

module.exports = {
    name: "ready",
    run: (bot) => {
        database.authenticate()
            .then(() => {
                console.log("Database conectada!")
                User.init(database);
                User.sync();
            })
            .catch((err) => console.log(`Um erro ocorreu durante a conexão da database ${err}`))
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        console.log(time + ` > Bot ligado oficialmente.`); 
        bot.user.setPresence({
              status: "online",
              game: {
                  name: `com ${bot.users.size} usuários e ${bot.guilds.size} servidores.`,
                  type: "PLAYING"
              }
          });
    }
}