const memes = require("random-memes");
const { MessageMedia } = require('whatsapp-web.js')

const memeCommand = async (client, message) => {
    const content = message.body

    if (content === '!meme') {
        const imgURL = await randomMeme()
        console.log("🚀 ~ file: meme.js:9 ~ memeCommand ~ imgURL:", imgURL)
        const memeImage = await MessageMedia.fromUrl(imgURL)

        client.sendMessage(message.from, memeImage)
    }
}

module.exports = { name: 'meme', execute: memeCommand };


const randomMeme = async () => {
    try {
        const meme = await memes.random()
        return meme.image
    } catch (error) {
        console.error('Error fetching random meme:', error)
        throw error
    }
}