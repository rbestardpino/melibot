module.exports = {
  commands: 'help',
  expectedArgs: '<comando1> <comando2> ...',
  description:
    'Responde con la descripción de los comandos que le pases. Si no le pasas ninguno, te manda todos los comandos disponibles.',
  callback: (message, arguments, text) => {
    const descriptions = require('../descriptions.json')
    if (arguments.length) {
      for (const arg of arguments) {
        if (descriptions[arg]) {
          message.channel.send('**' + arg + '**: ' + descriptions[arg])
        } else {
          message.channel.send('El comando **' + arg + '** no existe.')
        }
      }
      return
    }
    var response = 'Comandos disponibles:\n\n'

    for (let [key, value] of Object.entries(descriptions)) {
      response += `**${key}**: ${value}\n`
    }

    response +=
      '\nPara más info sobre los comandos ingresá a https://top.gg/bot/830565214826266634'

    message.channel.send(response)
  },
}
