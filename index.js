const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Bot ist online als ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!ping')) {
    message.reply('Pong!');
  }
});

client.login("TOKEN:",process.env.TOKEN);
