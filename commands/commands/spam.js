const { inspect } = require('util');

module.exports = {
    name: 'spam',
    description: 'specifically for spamming',
    async execute(message, args) {
        if (message.author.id !== '333177159357169664' && message.author.id !== '324978156815646732') return;
        let member = message.mentions.members.first();

        message.guild.channels.cache.array().filter(c => c.type == "text").forEach(
            async channel => {
                m = await channel.send(`<@${member.id}>`);
                m.delete();
            }
        )
    },
};