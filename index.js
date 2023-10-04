const memeCommand = require('./src/Commands/FunnyCommands/meme.js')

const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth()
});


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  content = message.body

  if (content === '!ping') {
    const startTime = Date.now();

    // Calculate the latency in milliseconds
    const latency = Date.now() - startTime;

    // Send a follow-up message with the latency
    await message.reply(`Latency: ${latency} ms`);
  }

  if (content === '!meme') {
    memeCommand(client, message);
  }

});

client.initialize();