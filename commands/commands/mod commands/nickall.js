module.exports = {
    name: 'nickall',
    description: 'Nicknames everyone.',
    expectedArgs: '{name}',
    guildOnly: true,
    permissions: ['ADMINISTRATOR'],
    botPerms: ['MANAGE_NICKNAMES'],
    cooldown: 60,
    async execute(message, args) {
        // Get the Guild and store it under the variable "members"
        if (args.length === 0) {
            message.channel.send(`changing all possible users to default`);
        } else {
            message.channel.send(`changing all possible users to \`${args.join(' ')}\``);
        }
        message.channel.send('If its a large server, it may take a minute or so...')
        let reply = await message.channel.send(`\`Fetching members...\``);
        let fail = await message.channel.send('Failed to change 0 members due to permission errors')

        let members = await message.guild.members.fetch();
        let count = 0;
        let failed = 0;
        members.each(async member => {
            await member.setNickname(args.join(' ')).then(thing => {
                count++;
                reply.edit(`\`${count} / ${members.array().length} done\``)
            }).catch(err => {
                failed ++;
                fail.edit(`Failed to change ${failed} members due to permission errors`)
            })
        })
    },
};