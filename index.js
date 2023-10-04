const fs = require('fs');
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth()
});

const commands = new Map()

const loadCommands = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = `${dir}/${file}`;
    if (fs.statSync(fullPath).isDirectory()) {
      loadCommands(fullPath); 
    } else if (file.endsWith('.js')) {
      const command = require(fullPath);
      commands.set(file.split('.')[0], command);
    }
  });
};

loadCommands('./src/Commands');

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  const content = message.body;
  const args = content.split(' ');
  const commandName = args[0].toLowerCase().substring(1); 

  if (commands.has(commandName)) {
    const command = commands.get(commandName);
    await command(client, message, args);
  }
});

client.initialize();