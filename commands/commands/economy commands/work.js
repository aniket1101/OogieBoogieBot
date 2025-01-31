const Discord = require("discord.js");
const economySchema = require('@models/economy-schema')

module.exports = {
    name: 'work',
    description: 'Work for some money',
    guildOnly: true,
    cooldown: 60 * 5,
    async execute(message, args) {
        const economyCollection = economySchema;

        let gained = Math.round(Math.random() * 200)

        await economyCollection.findOneAndUpdate(
            {
                _id: message.author.id
            },
            {
                $setOnInsert: { bank: 0 },
                $inc: { money: gained }
            },
            {
                returnNewDocument: true,   // return new doc if one is upserted
                upsert: true // insert the document if it does not exist
            })

        let embed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName} has worked!`)
            .setDescription(`**${message.member.displayName}** has gained **$${gained}** after working!`)
            .setColor('#0099ff')

        message.channel.send({embeds: [embed]})
    },
};