module.exports = {
  name: 'help',
  description:
    'Responde con la descripción de los comandos que le pases. Si no le pasas ninguno, te manda todos los comandos disponibles',
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
      const fs = require('fs')

      const commandFiles = fs
        .readdirSync('./assets/commands/')
        .filter((file) => file.endsWith('.js'))

      let resp = '\n'

      for (const file of commandFiles) {
        const command = require(`./${file}`)

        resp += `**${command.name}**: ${command.description}\n\n`
      }
      message.reply(resp)
    }
  },
}
