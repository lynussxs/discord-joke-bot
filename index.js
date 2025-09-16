import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('!joke')) {
        try {
            const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
            const joke = await res.json();
            await message.channel.send(`${joke.setup} ... ${joke.punchline}`);
        } catch (err) {
            console.error(err);
            await message.channel.send('Oops, không lấy được joke 😅');
        }
    }
});

client.login(TOKEN);