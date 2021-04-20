module.exports = {
  name: '404CommandNotFound',
  description:
    'No podes acceder a este comando, está hecho para cuando alguien escribe un comando que no existe',
  execute(message, args) {
    message.reply(
      'Ese comando no existe, usa *.help* para ver una lista de todos los comandos que podes usar.'
    )
  },
}
