module.exports = {
  name: 'help',
  description:
    'Responde con la descripción de los comandos que le pases. Si no le pasas ninguno, te manda todos los comandos disponibles a tu DM',
  execute(message, args) {
    if (args.length != 0) {
      for (const arg of args) {
        try {
          const command = require(`../commands/${arg}.js`)
          message.channel.send(
            '**' + command.name + '**: ' + command.description
          )
        } catch (e) {
          message.channel.send('Command **' + arg + '** does not exist')
          return
        }
      }
    } else {
      //TODO
      message.member.send(
        'Aca tenes una lista de comandos que podes usar en este bot https://youtu.be/dQw4w9WgXcQ'
      )
    }
  },
}
