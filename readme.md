# Bot Familia L


# --- Comandos ---
# Diversao
  - rbuser
  - piadas
  - alimentar
# Economia  
  - daily
  - pagar
  - ranking
  - saldo
# Informações
  - ajuda
  - info
# Miscelânea
  - perfil
  - frase
  - capa
# Moderação
  - editmoney

# --- Base de comando ---
```js
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
     //comando aqui
};

module.exports.help = {
  name: "comando",
  aliases: ["alternativa"],
  permission: "ADMINISTRATOR",
  category: "Categoria",
  description: "Descricao",
  usage: "comando (alguma coisa)",
};
```