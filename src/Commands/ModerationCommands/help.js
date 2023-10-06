const commands = require('../../../index')

const helpCommand = (client, message) => {
    const cmds = commands.keys()

    const commandList = Array.from(cmds).join(', ')

    client.sendMessage(message.from, `Commands: ${commandList}`)
}

module.exports = helpCommand; 