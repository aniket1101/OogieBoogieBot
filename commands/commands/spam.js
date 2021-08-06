const { inspect } = require('util');

module.exports = {
    name: 'spam',
    description: 'specifically for spamming',
    cooldown: 60,
    async execute(message, args) {
        if (message.guild.id !== '512578878305337354') return;
        let member = message.mentions.members.first();

        message.guild.channels.cache.array().filter(c => c.type == "text").forEach(
            async channel => {
                m = await channel.send(`<@${member.id}>`);
                m.delete();
            }
        )
    },
};
