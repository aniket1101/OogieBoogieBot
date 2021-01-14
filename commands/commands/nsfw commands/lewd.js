const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'lewd',
    description: 'Sends lewd.',
    
    async execute(message, args) {
        if (!message.channel.nsfw) return message.reply('This is not an NSFW channel');

        let response = await fetch('https://nekos.life/api/v2/img/lewdk');
        let json = await response.json();

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage(json.url)
            .setFooter(`Requested by ${message.author.tag}`)

        message.channel.send(embed);
    },
};