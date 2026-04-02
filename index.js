const { Client, GatewayIntentBits } = require('discord.js');

// 🔥 Bot Setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ✅ Bot ready
client.once('ready', () => {
  console.log(`🤖 Bot ist online als ${client.user.tag}`);
});

// 🔍 DEBUG: zeigt ALLE Nachrichten im Terminal
client.on('messageCreate', (message) => {
  console.log(`MSG: ${message.content}`);
});

// 📊 UMFRAGE COMMAND
client.on('messageCreate', async (message) => {
  try {
    // Bot ignorieren
    if (message.author.bot) return;

    // Command check
    if (!message.content.startsWith('!umfrage')) return;

    const parts = message.content.split('|');

    if (parts.length < 3) {
      return message.reply(
        '❌ Falsches Format!\n👉 !umfrage Frage | Option1 | Option2'
      );
    }

    const frage = parts[0].replace('!umfrage', '').trim();
    const option1 = parts[1].trim();
    const option2 = parts[2].trim();

    const pollText =
      `📊 **${frage}**\n\n` +
      `1️⃣ ${option1}\n` +
      `2️⃣ ${option2}`;

    const pollMessage = await message.channel.send(pollText);

    await pollMessage.react('1️⃣');
    await pollMessage.react('2️⃣');

  } catch (err) {
    console.error("Fehler im Command:", err);
  }
});

// 🔑 Login
client.login(process.env.TOKEN);
