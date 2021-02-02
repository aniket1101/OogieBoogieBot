const defaultRoleSchema = require('@models/default-role-schema');

module.exports = {
    name: 'untimeout',
    description: 'unmutes a person in server.',
    expectedArgs: '@user',
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    memberPermissions: ['MUTE_MEMBERS'],
    clientPermissions: ['MANAGE_ROLES'],
    async execute(message, args) {
        let defaultRoleCollection = defaultRoleSchema();
        let defaultRole = await defaultRoleCollection.findOne({
            _id: message.guild.id
        }, (err, object) => { });

        if (!defaultRole || defaultRole.defaultRole == '') {
            return message.reply(`You first have to set up the default role using \`e defaultrole\``);
        }

        let user = message.guild.members.cache.get(args[0]) || message.mentions.users.first();

        //fetches user if not in cache
        if (!user) {
            message.guild.members.fetch(args[0]).then(member => {
                user = member.user || message.mentions.users.first()
            }).catch((err) => {
                user = message.mentions.users.first();
            })
        }
        
        // If we have a user mentioned
        if (user) {
            if (user.bot) return message.channel.send('You can\'t do this to a bot');
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild

            if (member) {
                member
                    .roles.set([defaultRole.defaultRole])
                    .then(() => {
                        message.reply(`Successfully unmuted <@${user.id}>`);
                    })
                    .catch(err => {
                        if(err.message == 'Missing Permissions'){
                            return message.reply('I don\'t have the permissions to do that')
                        }
                        message.reply('I was unable to unmute the member');
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