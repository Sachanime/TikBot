const { Client, SlashCommandBuilder, Routes } = require("discord.js") //Import here all Discord classes you need to deploy slash commands
const { REST } = require("@discordjs/rest")

const id = require("./id.json") //You need id.json to use token and id of your Discord bot

const rest = new REST({ version: "10" }).setToken(id.token)

//Put here all slash commands you want to deploy
const commands = [

    new SlashCommandBuilder()
    .setName("ping")
    .setDescription("A simple test slash commannd"),

    new SlashCommandBuilder()
    .setName("infos")
    .setDescription("A simple slash command to show bot informations")

].map(command => command.toJSON())

rest.put(Routes.applicationCommands(id.members.BOT), { body: commands }).then((data) => console.log(`Sucessfully registered ${data.length} slash commands`)).catch(console.error)