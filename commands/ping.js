module.exports = {
  commands: 'ping',
  description: 'Necesitas explicación de este comando?',
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    message.reply('Pong!')
  },
}
