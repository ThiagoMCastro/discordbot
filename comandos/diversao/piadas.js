const Discord = require("discord.js");

var piadas = ["O quê o tomate foi fazer no banco?\n> Tirar extrato!", "Por quê o galo estava em cima da árvore?\n> Porque era uma **galopeira**!", "Qual o doce favorito do átomo?\n> pé-de-moléculas!", "Qual o prato que não consegue fazer nada direito?\n> A torta!"];
const jokes = {
    list:
        [
            { "joke": "Qual o contrário de Bailarino?","answer": "Baila-voltano."},
            { "joke": "O que é o que é? Tem nariz de cachorro, rabo de cachorro, orelha de cachorro, mas não é cachorro?","answer": "Cachorra."},
            { "joke": "Qual o contrário de salsicha?","answer": "Açúcaricha."},
            { "joke": "O que o aquário falou para o peixe?","answer": "Muito prazer, meu nome é aquário!"},
            { "joke": "Por que o Dinossauro não bate palma?","answer": "Porque ele já foi extinto."},
            { "joke": "Qual é o oposto de fechadura?","answer": "Abremole."},
            { "joke": "Qual é o oposto de Diamante?","answer": "Noitemante."},
            { "joke": "O que que a alface falou pra couve triste?","answer": "O que couve com você?"},
            { "joke": "Qual é a sobremesa preferida da vaca?","answer": "Múuuuu-sse"},
            { "joke": "Por que um dia vi um gato de um olho só?","answer": "Porque tampei o outro"},
            { "joke": "Tenho 5 maçãs, roubo de Joãozinho 5, quantas tartarugas tem no pote de doce?","answer": "Duas, pois vassoura não assiste TV a noite."},
            { "joke": "Qual a semelhança de um sapo e uma vassoura?","answer": "Com nenhum dos dois dá pra fazer pastel"}

        ]
}
module.exports.run = async (bot, message, args) => {
  const selected = jokes.list[Math.floor(Math.random() * jokes.list.length)];
        let embed = new Discord.RichEmbed()
            .setAuthor(`Tio do Pavê`, "https://pbs.twimg.com/profile_images/728184865301114882/GWIe2oTD_400x400.jpg")
            .setColor("#007FFF")
            .setTitle("Piada saiando do forno!")
            .setDescription(`**${selected.joke}** \n R: *${selected.answer}*`)
        message.channel.send(embed)
};

module.exports.help = {
  name: "piada",
  aliases: ["piadas", "jokes", "tiodopave"],
  category: "Diversão",
  description: "Aquelas piadinhas sem graça.",
  usage: "piada",
  adm: "false"
};
