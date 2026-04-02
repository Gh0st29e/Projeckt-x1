const { Client, GatewayIntentBits } = require('discord.js');
const express = require("express");

const app = express();
app.use(express.json());

// 🔥 BOT
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// 🧠 BOT READY
client.once('ready', () => {
  console.log(`🤖 Bot ist online als ${client.user.tag}`);
});

// 📊 UMFRAGE COMMAND (FIXED)
client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;

    if (!message.content.startsWith('!umfrage')) return;

    console.log("Command erkannt:", message.content);

    const parts = message.content.split('|');

    if (parts.length < 3) {
      return message.reply("❌ Format: !umfrage Frage | Option1 | Option2");
    }

    const frage = parts[0].replace('!umfrage', '').trim();
    const option1 = parts[1].trim();
    const option2 = parts[2].trim();

    const pollMessage = await message.channel.send(
      `📊 **${frage}**\n\n1️⃣ ${option1}\n2️⃣ ${option2}`
    );

    await pollMessage.react('1️⃣');
    await pollMessage.react('2️⃣');

  } catch (err) {
    console.error("Fehler bei Umfrage:", err);
  }
});

// 🌐 TEST ROUTE (Browser)
app.get("/", (req, res) => {
  res.send("Backend + Bot läuft 🚀");
});

// 📩 SEND TO DISCORD (für später App)
app.get("/test-discord", async (req, res) => {
  try {
    const channel = await client.channels.fetch(1345725442153381908);

    await channel.send("✅ Test vom Backend!");

    res.send("Nachricht gesendet!");
  } catch (err) {
    console.error(err);
    res.send("Fehler beim Senden");
  }
});

// 🚀 SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});

// 🔑 LOGIN
client.login(process.env.TOKEN);
