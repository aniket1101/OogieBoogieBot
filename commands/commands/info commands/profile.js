const Discord = require('discord.js');

module.exports = {
    name: 'profile',
    description: 'Gets someone\'s profile!',
    expectedArgs: '@user',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 1,
    execute: async (message, args) => {
        let user;
        await message.guild.members.fetch(args[0]).then(member =>{
            user = member.user|| message.mentions.users.first() || message.author || message.member.user;
        })
        const member = message.guild.members.cache.get(user.id);
        let roles = ``;
        member.roles.cache.array().forEach((item, index) => {
            roles += `<@&${item.id}> `
        })
        let daysCreated = Math.round((message.createdTimestamp - user.createdTimestamp) / 1000 / 60 / 60 / 24);
        let daysJoined = Math.round((message.createdTimestamp - member.joinedTimestamp) / 1000 / 60 / 60 / 24);

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`User info for ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Usertag:', value: `${user.tag}`, inline: true },
                { name: 'Display name:', value: `${member.displayName}`, inline: true },
                { name: 'ID:', value: `${user.id}` },
                { name: 'Created at:', value: `\`${user.createdAt.toDateString()}\` (${daysCreated} days ago)` },
                { name: 'Joined server at:', value: `\`${member.joinedAt.toDateString()}\` (${daysJoined} days ago)` },
                { name: 'Roles:', value: roles },
                { name: 'Bot:', value: `${user.bot}` },
            )
            .setFooter(`requested by ${message.author.tag}`)
        message.channel.send(embed);
    },
};