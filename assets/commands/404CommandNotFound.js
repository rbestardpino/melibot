module.exports = {
  name: '404CommandNotFound',
  description: 'En serio necesita una descripción este comando?',
  execute(message, args) {
    message.reply(
      'Ese comando no existe, chequea tus DMs para ver una lista de todos los comandos que podes usar.'
    )
    //TODO
    message.member.send(
      'Aca tenes una lista de comandos que podes usar en este bot https://youtu.be/dQw4w9WgXcQ'
    )
  },
}
