const Discord = require("discord.js");
const Usuario = require("../../database/models/User.js")

module.exports.run = async (bot, message, args) => {
  const amount = parseInt(args[1]);
  const tagged = message.mentions.users.first();
  if(!tagged) return message.channel.send("Mencione alguém :)")
   let profile = await Usuario.findOne({ where: { idd: message.author.id}}).catch(err => console.log(err));
    const embed = {
      title: "**Banco Família L :copyright:**",
      description: "Trabalhamos com seu dinheiro de forma fácil e segura :D",
      color: 15143211,
      thumbnail: {
        url:
          "https://pngimage.net/wp-content/uploads/2018/05/bank-cartoon-png-1.png"
      },
      fields: [
        {
          name: "<a:dinheiro:700910559197003786> Seu Saldo",
          value: `R$${profile.money-amount}`,
          inline: false
        },
        {
          name: "🔻Pagando:",
          value: `**<@${message.author.id}>**`,
          inline: true
        },
        {
          name: " **🔺Recebendo:**",
          value: `**<@${tagged.id}>**`,
          inline: true
        },
        {
          name: " **:credit_card: Valor:**",
          value: `**${amount}**`,
          inline: true
        }
      ]
    };

    if (!amount || amount > profile.money) {
      message.channel.send("Algo deu errado.");
    } else {
      message.channel.send({ embed: embed });
    }
    Usuario.increment({money: amount}, {where: {idd: tagged.id}})
    Usuario.decrement({money: amount}, {where: {idd: message.author.id}})
};

module.exports.help = {
  name: "pagar",
  aliases: ["pay", "pagamento"],
  category: "Economia",
  description: "Dê um pouco de seu dinheiro à alguém! :P",
  usage: "pagar (menção) (valor)",
  adm: "false"
};
