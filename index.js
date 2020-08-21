/**
 * Import des modules
 */
const { Client, Collection } = require("discord.js")
const { readdirSync } = require("fs")
const { join } = require("path")
const { TOKEN, PREFIX } = require("./config.json")

const client = new Client({ disableMentions: "everyone" })

client.login(TOKEN);
client.commands = new Collection()
client.prefix = PREFIX
client.queue = new Map()
const cooldowns = new Collection()
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} est en ligne !`)
  client.user.setActivity(`${PREFIX}help`)
});
client.on("warn", (info) => console.log(info))
client.on("error", console.error)

/**
 * Import de toutes les commandes
 */
const commandFiles = readdirSync(join(__dirname, "commandes")).filter((file) => file.endsWith(".js"))
console.log(`${commandFiles.length} commandes chargées !`)
console.log('------------------------------------------')
for (const file of commandFiles) {
  const command = require(join(__dirname, "commandes", `${file}`))
  client.commands.set(command.name, command)
  console.log(`Commande '${command.name}' chargée avec succès ! ✔`)
}
console.log('------------------------------------------')

client.on("message", async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`)
  if (!prefixRegex.test(message.content)) return

  const [, matchedPrefix] = message.content.match(prefixRegex)

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) return

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 1) * 1000

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      return message.reply(
        `tu dois encore attendre ${timeLeft.toFixed(1)} secondes avant de pouvoir ré-exécuter la commande \`${command.name}\`.`
      );
    }
  }

  timestamps.set(message.author.id, now)
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply("une erreur est survenue lors de l'exécution de cette commande, merci de réessayer plus tard.").catch(console.error)
  }
});
