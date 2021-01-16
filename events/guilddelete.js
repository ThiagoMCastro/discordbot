const config = require("../config.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const database = require("../database/database.js")
const User = require('../database/models/User.js');
const fs = require("fs")
const guildConf = require("../guildconfig.json")
module.exports = {
    name: "guildDelete",
    run: (guild) => {
       delete guildConf[guild.id]; // Deletes the Guild ID and Prefix
           fs.writeFile('./guildconfig.json', JSON.stringify(guildConf, null, 2), (err) => {
            if (err) console.log(err)
        })
    }
}