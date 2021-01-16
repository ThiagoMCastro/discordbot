//Obrigatorios 
const { readdirSync } = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');
const manutencao = config.manutencao;
//carregar eventos e cmds
loadEvents("./events/");
loadComandos("./comandos/");

//carregar e salvar per-server configs
var guildConf = require('./guildconfig.json');


//funcoes
function loadEvents(dir){
    fs.readdir(dir, (err, files) =>{
        if (err) console.log(`Um erro ocorreu durante o carregamento dos eventos ${err}`);
        let jsfiles = files.filter( f=> f.split(".").pop() === "js");
        if (jsfiles.length <= 0){
            console.log(`Não há eventos para carregar`);
            return;
        }
        console.log(`Carregando ${jsfiles.length} eventos.`);
        jsfiles.forEach((f,i) =>{
            let props = require(`${dir}${f}`);
            bot.on(props.name, (...args) => props.run(bot, ...args));
        });
    });
}


//Gerenciador de comandos
function loadComandos(diretorio){
  bot.commands = new Discord.Collection();
  bot.aliases = new Discord.Collection();
  bot.categoria = new Discord.Collection();
  readdirSync(`${diretorio}`).forEach(dir => {
          const commands = readdirSync(`./${diretorio}/${dir}/`).filter(file => file.endsWith(".js"));
          for (let file of commands) {
              let pull = require(`./${diretorio}/${dir}/${file}`);

              if (pull.help.name) {
                  bot.commands.set(pull.help.name, pull);
                  bot.categoria.set(pull.help.category, pull);
              } else {
                  continue;
              }
              if (pull.help.aliases && Array.isArray(pull.help.aliases)) pull.help.aliases.forEach(alias => bot.aliases.set(alias, pull.help.name));
          }
      });
}
bot.login(config.token);