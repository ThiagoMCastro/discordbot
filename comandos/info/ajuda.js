const { readdirSync } = require('fs');

module.exports = {
  run: (client, message, args) => {
    
    /** Objeto embed que irá ser enviado. */
    let embed = {
      color: 9568000,
      thumbnail: {
        url: `${client.user.avatarURL}`
      },
      title: 'Lista de Comandos',
      url: '',
      description: '',
      fields: []
    }

    /** Laço de repetição em todos os comandos
     * A cada comando é adicionado as informações em um object na array fields[]
     */
    let comando = client.commands;
    comando.forEach(command => {
        embed.fields.push({
          name: `**d.${command.help.name}**`,
          value: `*Descrição*: ${command.help.description}
          *Categoria*: ${command.help.category}\n`,
          inline: "true"
        })
        
        });
    
    message.channel.send({ embed: embed })
  },

  conf: {},

  help: {
    name: 'ajuda',
    aliases: ['help'],
    category: 'Informações',
    description: 'Mostra todos os comandos disponíveis do bot.',
    usage: 'ajuda',
  adm: "false"
  }
}