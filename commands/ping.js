const { SlashCommandBuilder } = require("discord.js");

module.exports = { // Sets Command Name and Descripton (Like a meta data header, no function yet!)
	data: new SlashCommandBuilder() 
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {  // Getting there, This just liatiens for an an interaction (Looking out if anyone toyes /ping, then reapies with fter command is entred 'Pong'.
		await interaction.reply('Pong!');
	},
};


 /* TIP

module.exports
is how you export data in Node.js so that you can require()

it in other files.

If you need to access your client instance from inside a command file, you can access it via interaction.client. If you need to access external files, packages, etc., you should require() them at the top of the file.
*/