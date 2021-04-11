const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client()

const prefix = '.'

const fs = require('fs')

client.commands = new Discord.Collection()

const commandFiles = fs
  .readdirSync('./assets/commands/')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./assets/commands/${file}`)

  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('Bot initialized.')
})

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/\s+/)

  const command = args.shift().toLowerCase()

  if (client.commands.has(command)) {
    client.commands.get(command).execute(message, args)
  } else {
    client.commands.get('404CommandNotFound').execute(message, args)
  }
})

client.login(process.env.TOKEN)
