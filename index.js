const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js")

const id = require("./id.json")
const package = require ("./package.json")
const packageLock = require("./package-lock.json")

const intentsCode = [53608447]
const intentsBits = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] //Put here only Discord Intents you need
const prefix = "*"

const client = new Client({ intents: intentsBits })

client.login(id.token)

client.once("clientReady", () => {

    console.log("Ready!")

})

client.on("messageCreate", message => {

    if(message.author.bot) { return } 

    if(message.content == prefix + "ping") {
        message.reply("Pong!")
    }

})

client.on("interactionCreate", interaction => {

    const { commandName } = interaction

    if(commandName == "ping") {

        const pingEmbed = new EmbedBuilder()
        .setTitle("Ping ?")
        .setColor("Green")
        .setThumbnail(client.user.avatarURL())
        .setDescription("Pong!")

        interaction.reply({ embeds: [pingEmbed] })

    }

    if(commandName == "infos") {
        
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