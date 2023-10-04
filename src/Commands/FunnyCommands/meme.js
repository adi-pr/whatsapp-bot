const memes = require("random-memes");
const { MessageMedia } = require('whatsapp-web.js')

const memeCommand = async (client, message) => {
    const content = message.body

    const imgURL = await randomMeme()
    const memeImage = await MessageMedia.fromUrl(imgURL)

    client.sendMessage(message.from, memeImage)

}

const randomMeme = async () => {
    try {
        const meme = await memes.random()
        return meme.image
    } catch (error) {
        console.error('Error fetching random meme:', error)
        throw error
    }
}


module.exports = memeCommand;