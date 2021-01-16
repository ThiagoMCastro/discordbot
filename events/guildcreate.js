const config = require("../config.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const database = require("../database/database.js")
const User = require('../database/models/User.js');
const fs = require("fs")
const guildConf = require("../guildconfig.json")
module.exports = {
    name: "guildCreate",
    run: (guild) => {
       if (!guildConf[guild.id]) { // If the guild's id is not on the GUILDCONF File, proceed
        guildConf[guild.id] = {
          prefix: config.prefix
        }
          }
           fs.writeFile('./guildconfig.json', JSON.stringify(guildConf, null, 2), (err) => {
            if (err) console.log(err)
        })
    }
}