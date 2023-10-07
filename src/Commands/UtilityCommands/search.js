const googleIt = require('google-it')

const searchCommand = (client, message, args) => {

  const q = args.slice(1).join(" ")

  googleIt({ 'query': q, 'no-display': '--output', "limit": '3' })
    .then(results => {
      if (results.length === 0) {
        // Handle the case when no results are found
        client.sendMessage(message.from, "No results found for your query.")
      } else {
     
          const responseMessage = results.map(result => `${result.title}\n${result.link}\n${result.snippet}`).join('\n\n')
    
          client.sendMessage(message.from, responseMessage)
      }
    })
    .catch(e => {
      // Handle errors
      client.sendMessage(message.from, "An Unexpected Error Occurred");
    });

}

module.exports = searchCommand;