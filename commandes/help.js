const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Affiche toutes les commandes disponibles",
  execute(message) {
    let commands = message.client.commands.array()

    let helpEmbed = new MessageEmbed()
      .setTitle("Commandes")
      .setDescription("Commandes disponibles")
      .setColor("#F8AA2A")

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      )
    })

    helpEmbed.setTimestamp()

    return message.channel.send(helpEmbed).catch(console.error)
  }
}