// Require the necessary discord.js classes
const fs = require('node:fs'); // Reads the commands directory and identify the command files
const path = require('node:path'); // Helps construct paths to access files and directories. 
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');// Collection is used to store and efficiently retrieve commands for execution
const { token } = require('./config.json');  // pulls token form another file for security
const prefix = '/'; // Sets prefix bot used to pick up commands

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands'); //  helps to construct a path to the commands directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // readdirSync reads the path to the directory and returns an array of all the file names it contains & Array.filter() is used to ensure only command files get processed removes any non-JavaScript files from the array.

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath); // Set a new item in the Collection with the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => { // Listening for users command input
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

/* When the client is ready, run this code (only once)
 We use 'c' for the event parameter to keep it separate from the already defined 'client'
Sets bots activity status under Discord name
*/
client.login(token);