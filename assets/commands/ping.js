module.exports = {
  name: 'ping',
  description: 'Necesitas que te lo explique?',
  execute(message, args) {
    message.channel.send('Acá estoy')
  },
}
