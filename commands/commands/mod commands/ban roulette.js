module.exports = {
    name: 'banroulette',
    description: 'Bans a randomly picked person.',
    guildOnly: true,
    memberPermissions: ['ADMINISTRATOR'],
    clientPermissions: ['BAN_MEMBERS'],
    async execute(message, args) {

        let members = await message.guild.members.fetch();

        //delete self so you can't ban yourself
        members.delete(message.client.user.id)
        
        let member = members.random()

        member
            .ban({
                reason: `by ban roullete!`,
            })
            .then(() => {
                // We let the message author know we were able to ban the person
                message.reply(`Successfully banned ${member.user.tag}`);
            })
            .catch(err => {
                // either due to missing permissions or role hierarchy
                message.reply(`Attempted to ban ${member.user.tag} but failed. (Probably due to permission errors)`);
                // Log the error
                console.error(err);
            });
    },
};