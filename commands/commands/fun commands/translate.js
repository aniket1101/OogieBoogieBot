const { Client, Message, MessageEmbed } = require('discord.js')
const Discord = require('discord.js');

// API for translation, does not require a key
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: "translate",
    description: 'Translates text from any language to English.',
    minArgs: 1,
    cooldown: 2,

    /**
     * @param {client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        const query = args.join(" ");
        if (!query) return message.reply('No text to translate');

        const translated = await translate(query, { to: 'en'});
        message.channel.send(translated.text);
    },
};