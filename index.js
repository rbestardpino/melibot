const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')

client.on('ready', async () => {
  const schedule = require('node-schedule')

  client.user.setActivity(`${config.prefix}help`, {
    type: 'LISTENING',
  })

  console.log(`Bot iniciado como ${client.user.tag}`)

  const job = schedule.scheduleJob('*/40 * * * *', function () {
    console.log(
      'Cantidad de servidores a los que el bot pertenece: ' +
        client.guilds.cache.size
    )
  })

  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))

    var descriptions = {}

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))

      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        if (typeof option.commands === 'string') {
          option.commands = [option.commands]
        }
        descriptions[option.commands[0]] = option.description
        commandBase(client, option)
      }
    }
    fs.writeFileSync('./descriptions.json', JSON.stringify(descriptions))
  }

  readCommands('commands')
})

client.login(config.token)
