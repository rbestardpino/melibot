const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const schedule = require('node-schedule')
const config = require('./config.json')
require('dotenv').config()

const client = new Discord.Client()

client.on('ready', async () => {
  console.log(`Bot iniciado como ${client.user.tag}`)

  client.user.setActivity(`${config.prefix}help`, {
    type: 'LISTENING',
  })

  const job = schedule.scheduleJob('*/40 * * * *', function () {
    console.log(
      'Cantidad de servidores a los que el bot pertenece: ' +
        client.guilds.cache.size
    )
    client.user.setActivity(`${config.prefix}help`, {
      type: 'LISTENING',
    })
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

client.login(process.env.TOKEN)

if (process.platform === 'win32') {
  var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.on('SIGINT', function () {
    process.emit('SIGINT')
  })
}

process.on('SIGINT', function () {
  console.log('Have a good mantainance work!')
  process.exit()
})
