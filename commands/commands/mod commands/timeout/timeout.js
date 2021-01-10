const timeoutSchema = require('@models/timeout-schema');

module.exports = {
    name: 'timeout',
    description: 'Timeouts a person!',
    expectedArgs: '@user',
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    permissions: ['MUTE_MEMBERS'],
    async execute(message, args) {

        let timeoutCollection = timeoutSchema(message.guild.id);
        let timeout = await timeoutCollection.findOne({
            _id: 'roles'
        }, (err, object) => {});

        if(!timeout){
            return message.reply(`You first have to set up the timeout role using \`e timeoutrole\``);
        }

        let user;
        await message.guild.members.fetch(args[0]).then(member => {
            user = member.user || message.mentions.users.first() || message.author || message.member.user;
        }).catch((err) => {
            user = message.mentions.users.first() || message.author || message.member.user;
        })

        if (user.bot) return message.channel.send('You can\'t do this to a bot');
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);

            // If the member is in the guild

            if (member) {
                if (member.roles.highest.position >= message.member.roles.highest.position) {
                    return message.reply('Unable to timeout someone with an equal or higher role than you');
                }
                if (message.guild.member(message.client.user).roles.highest.position <= message.member.roles.highest.position) {
                    return message.reply('I\m unable to timeout someone with an equal or higher role than me');
                }

                member
                    .roles.set([timeout.timeoutRole])
                    .then(() => {
                        message.reply(`Successfully muted <@${user.id}>`);
                    })
                    .catch(err => {
                        message.reply('I was unable to mute the member');
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this server!");
            }
            // Otherwise, if no user was mentioned
        } else {
            message.reply("You didn't mention the user to mute!");
        }
    },
};