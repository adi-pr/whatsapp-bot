const infoCommand = (client, message) => {
    const infoMessage = `Bot Name: CSBot\nPurpose: Providing CS-related information and assistance.\nCreated By: Aditya (Ruben) Prasad\nGitHub Repository: https://github.com/adi-pr/whatsapp-bot\nContact: +592 600-2376`;

    client.sendMessage(message.from, infoMessage)
}

module.exports = infoCommand