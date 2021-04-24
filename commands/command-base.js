const { prefix } = require('../config.json')

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Permiso desconocido: "${permission}"`)
    }
  }
}

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = '',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    permissionError = 'no tenés permiso para usar este comando.',
    requiredRoles = [],
    callback,
  } = commandOptions

  if (typeof commands === 'string') {
    commands = [commands]
  }

  console.log(`Registrando comando "${commands[0]}"`)

  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  client.on('message', (message) => {
    const { member, content, guild } = message

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command}`) ||
        content.toLowerCase() === command
      ) {
        console.log(
          `[${new Date(Date.now()).toUTCString()}] ${message.author.username}#${
            message.author.discriminator
          } in ${guild || 'private channel'}: ${content}`
        )

        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError)
            return
          }
        }

        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `necesitas tener el rol "${requiredRole}" para poder usar este comando.`
            )
            return
          }
        }

        const args = content.split(/[ ]+/)
        args.shift()

        if (
          args.length < minArgs ||
          (maxArgs !== null && args.length > maxArgs)
        ) {
          message.reply(
            `uso incorrecto del comando! Uso: \`${prefix}${alias} ${expectedArgs}\``
          )
          return
        }

        callback(message, args, args.join(' '), client)

        return
      }
    }
  })
}
