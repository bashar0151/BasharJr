// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js');
const { token } = require('./config.json');

// Sets prefix bot used to pick up commands
const prefix = '/';
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
//Sets bots activity status under Discord name
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	client.user.setActivity(`Being Bashar's Virtual Son!`, { type: "WATCHING"});
});

// Log in to Discord with your client's token
client.login(token);


//Setups command handlear taks prefction and action typed command by user
client.on("messageCreate", (message) => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	//Message array

	const messageArray = message.content.split("");
    const argument = messageArray.slice(1);
	const cmd = messageArray[0];
	
	// Commands

	// Tesy command

	if (command === 'test') {

		message.channel.send("Bot is working")
	}
})
