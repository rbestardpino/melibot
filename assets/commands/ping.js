module.exports = {
  name: 'ping',
  description: 'Do you really need a description for this command?',
  execute(message, args) {
    message.channel.send('Here I am')
  },
}
