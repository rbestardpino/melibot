const Discord = require('discord.js')
const https = require('https')

module.exports = {
  commands: ['searchbr', 'sbr'],
  description: 'Pesquisar usando o MercadoLivre.',
  expectedArgs: '<que deseja localizar no MercadoLibre>',
  minArgs: 1,
  callback: (message, arguments, text) => {
    const searchURL = `https://api.mercadolibre.com/sites/MLB/search?q=${text}`

    https
      .get(searchURL, (resp) => {
        let data = ''

        resp.on('data', (chunk) => {
          data += chunk
        })

        resp.on('end', () => {
          const parsedData = JSON.parse(data)
          if (parsedData.paging.total == 0) {
            message.reply('Eu não posso procurar por essas coisas :cry:')
            return
          }
          const resp = parsedData.results[0]

          const embed = new Discord.MessageEmbed()
          embed.setAuthor('Resultados para "' + parsedData.query + `"`)
          embed.setColor('#F2F50C')
          embed.setTitle(resp.title)
          embed.setThumbnail(
            'https://www.expoknews.com/wp-content/uploads/2020/03/1200px-MercadoLibre.svg-1.png'
          )
          embed.setURL(resp.permalink)
          embed.setImage(resp.thumbnail)
          embed.setFooter('Powered by rbestardpino.xyz')
          embed.setTimestamp()

          let n
          if (resp.seller.seller_reputation.level_id)
            n = parseInt(resp.seller.seller_reputation.level_id.charAt(0))
          else n = 0
          const stars = '⭐'.repeat(n) + '✰'.repeat(5 - n)

          const description = `:moneybag: ***${resp.price}*** ${
            resp.currency_id
          }\n${
            resp.shipping.free_shipping ? ':white_check_mark:' : ':x:'
          } Free shipping\n\n:grey_question: ***${resp.condition.toUpperCase()}***\n\n:pickup_truck: ${stars}`

          embed.setDescription(description)

          message.channel.send(embed)
        })
      })
      .on('error', (err) => {
        console.log('Error: ' + err.message)
      })
  },
}
