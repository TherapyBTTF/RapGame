const { MessageEmbed } = require("discord.js")
const { PREFIX } = require('../config.json')
var db = require('../dbconnect.js')
var id_rappeur, nom_rappeur, dob_rappeur, img_rappeur, style_rappeur, rarete_rappeur, dispo_rappeur, id_categorie


module.exports = {
  name: "rappeurfr",
  aliases: ['rf'],
  description: "Tire un rappeur au hasard dans la liste des rappeurs Français",
  execute(message) {
    db.query("select * from rappeurs where dispo_rappeur = 1 order by rand() limit 1", function (err, result) {
      if (err) throw err;
      id_rappeur = result[0].id_rappeur
      nom_rappeur = result[0].nom_rappeur
      dob_rappeur = new Date(result[0].dob_rappeur)

      img_rappeur = result[0].img_rappeur
      style_rappeur = result[0].style_rappeur
      rarete_rappeur = result[0].rarete_rappeur
      dispo_rappeur = result[0].dispo_rappeur
      id_categorie = result[0].id_categorie
    });

    const embed = new MessageEmbed()
    .setColor('#FF5733')
    .setTitle(`**${message.author.username}** a choppé le rappeur **${nom_rappeur}** !`)
    .setDescription(`*Vous avez 15s pour réagir au message afin de l'ajouter à votre collection !*`)
    .setImage(img_rappeur)
    .addFields(
      { name: 'Rareté', value: rarete_rappeur},
      { name: 'Nom', value: nom_rappeur},
      { name: 'Âge', value: getAge(dob_rappeur)},
      { name: 'Style', value: style_rappeur}
    )
    .setFooter("rappeurfr")
    .setTimestamp()
    message.channel.send(embed).then(function(msg) {
      msg.react('👍')
          const filter = (reaction, user) => {
            return ['👍'].includes(reaction.emoji.name) && user.id === message.author.id
          }

          msg.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
          .then(collected => {
              const reaction = collected.first()
              if (reaction.emoji.name === '👍') {
                let userFirstReact = Array.from(reaction.users.cache.keys())
                let sql = "insert into acquisitions (id_rappeur, id_joueur) values ?"
                let values = [
                  [id_rappeur, userFirstReact[1]]
                ]
                db.query(sql, [values], function (err, result) {
                  if (err) throw err
                  message.channel.send(`<@${userFirstReact[1]}>, tu as obtenu le rappeur **${nom_rappeur}** !`)
                })
              }
          })
          .catch(collected => {
            message.reply("personne n'a réagi au message, le rappeur a filé.")
          });
    })
  }
}
function getAge(dateString) {
  var today = new Date()
  var birthDate = new Date(dateString)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
  }
  return age
}
