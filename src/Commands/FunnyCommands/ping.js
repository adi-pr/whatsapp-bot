const pingCommand = (client, message) => {
    const content = message.body

    if (content === '!ping') {
        message.reply("Pong!")
    }
}


module.exports = pingCommand