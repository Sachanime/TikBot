//Import all libs you need
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js") //Put here all Discord classes you need

//Import all files you need
const id = require("./id.json") //Ypu need id.json to use the token of your bot
const package = require ("./package.json")
const packageLock = require("./package-lock.json")

//Declare all variables and constants you need
const intentsCode = [53608447] //This code is the code for all Discord Intents
const intentsBits = [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] //Put here only Discord Intents you need
const prefix = "*" //You can choose any prefix you want

const client = new Client({ intents: intentsBits }) //You can use intentsCode or intentsFields

client.login(id.token) //The token must be delcared in id.json

//Put in this event the code you to be executed when your bot is ready
client.once("ready", () => {

    console.log("Ready!")

})

//Put in this event all your textual commands (require Discord Intent "GuildMessages")
client.on("messageCreate", (message) => {

    if(message.author.bot) { return } //Ignore all messages from other Discord bots

    //A simple test textual command (require Discord Privileged Intent "MessageContent")
    if(message.content == prefix + "ping") {
        message.reply("Pong!")
    }

})

//Put in this event the code of all your slash commands deployed
client.on("interactionCreate", interaction => {

    const { commandName } = interaction

    //Code for slash command "infos"
    if(commandName == "ping") {

        //A Discord Embed to enhance the style of the reply
        const pingEmbed = new EmbedBuilder()
        .setTitle("Ping ?")
        .setColor("Green")
        .setThumbnail(client.user.avatarURL())
        .setDescription("Pong!")

        interaction.reply({ embeds: [pingEmbed] })

    }

    //Code for slash command "infos"
    if(commandName == "infos") {
        
        //A Discord Embed to enhance the style of the reply
        const infosEmbed = new EmbedBuilder()
        .setTitle("Discord Bot")
        .setColor("Blue")
        .setThumbnail(client.user.avatarURL())
        .setDescription(
            package.description + "\n\n" +
            "__**Verions**__" + "\n\n" +
            "Discord Bot : " + package.version + "\n\n" +
            "Node.js : " + process.version + "\n\n" +
            "Discord.js : " + packageLock.packages["node_modules/discord.js"].version
        )

        interaction.reply({ embeds: [infosEmbed] })

    }

})