const https = require('https')

https
  .get('https://api.mercadolibre.com/sites/MLA/search?q=juguete', (resp) => {
    let data = ''

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).filters)
    })
  })
  .on('error', (err) => {
    console.log('Error: ' + err.message)
  })
