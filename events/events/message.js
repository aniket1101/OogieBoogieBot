const config = require('@root/config.json');
const prefix = config.prefix;
const commandBase = require('@root/commands/command-base');

module.exports = async (client, message) => {
    let { author, content, channel } = message;

    if (author.bot) return;
    content = content.toLowerCase();

    //prefixes and commands
    if (content.startsWith(prefix)) {
        commandBase(message);
        return;
    }

    //simple replies
    //rey
    const rey = ['REY IS INSANELY UGLY HOLY FUCK', 'Rey is a pedo', 'Rey? The failure of a human being?',
        'Rey is packing a tic-tac', 'Rey has iq of room temperature', 'Rey contains much stupid',
        'Rey put thermal paste under his cpu', 'Rey has a gay level 999', 'Rey is a big homo',
        'Pritten patil picked the wrong baby when adopting', 'Rey has big boobies',
        'Rey is a stinky', 'Rey is a curry muncher', 'Rey shoots up orphanages', 'Rey watched 300 naruto episodes in a week',
        'Rey is a weeb', 'Rey wants to fuck Tima', 'Rey got his league account banned', 'Ben chud', 'Rey wants to get pegged by Joe',
        'Rey is hardstuck plat', 'Rey you eat cow'];

    if ((message.guild?.id === '512578878305337354' || message.guild?.id === '684391250777866301') && author.id === '395152698120339456' && (content.includes('cdn.discordapp.com') || content.includes('media.discordapp.net') || message.attachments.size > 0)) {
        message.reply('Not funny.')
        // await message.delete({ reason: 'arran made bad meme' }).catch(() => {})
    }

    // rey delete
    // if (message.author.id === '512375511205543936' && message.guild.id === '512578878305337354') {
    //     await message.delete().catch(() => { });
    // }

    if (content.replace(/[<@!>]/g, '') === client.user.id) {
        channel.send(`Type \`${prefix}help\` for some help`);
    }
};
