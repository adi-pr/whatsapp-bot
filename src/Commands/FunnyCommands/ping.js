const pingCommand = (client, message) => {
    const content = message.body

    message.reply("Pong!")
}


module.exports = pingCommand