// Require the necessary discord.js classes
const fs = require('node:fs'); // Reads the commands directory and identify the command files
const path = require('node:path'); // Helps construct paths to access files and directories. 
const { Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Collection } = require('discord.js'); // Collection is used to store and efficiently retrieve commands for execution
const { token } = require('./config.json');

// Sets prefix bot used to pick up commands
const prefix = '/';
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

/* When the client is ready, run this code (only once)
 We use 'c' for the event parameter to keep it separate from the already defined 'client'
Sets bots activity status under Discord name
*/

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

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands'); //  helps to construct a path to the commands directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // readdirSync reads the path to the directory and returns an array of all the file names it contains & Array.filter() is used to ensure only command files get processed removes any non-JavaScript files from the array.

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, interaction => { //Receiving command interactions
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

client.on(Events.InteractionCreate, async interaction => { //Executing commands
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

