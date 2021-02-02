const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: 'record',
    description: 'records your audio',
    // expectedArgs: '{tag}',
    // minArgs: 1,
    guildOnly: true,
    async execute(message, args) {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;

        if (member.voice.channel) {


            let connection = await member.voice.channel.join()
            if (!connection) message.reply(`I can't seem to join the channel...`)

            if (fs.existsSync(`./recorded-${member.id}.pcm`)) {
                fs.unlink(`./recorded-${member.id}.pcm`, function (err) {
                    if (err) throw err;
                    // console.log('File deleted!');
                })
            }
            // return;
            const audio = connection.receiver.createStream(member.user, { mode: 'pcm', end: 'manual' });
            const writer = audio.pipe(fs.createWriteStream(`./recorded-${member.id}.pcm`));
            message.channel.send(`Recording **${member.displayName}** | type \`stop\` to stop recording`)

            const filter = m => {
                return (m.author.id === message.author.id && m.content == 'stop')
            }

            const collector = new Discord.MessageCollector(message.channel, filter, {
                time: 1000 * 60,
                max: 1
            })

            collector.on('end', m => {
                
                audio.unpipe();
                message.channel.send('Finished recording audio.')
            })

            writer.on('finish', () => {
                collector.stop()
            })

        } else {
            message.reply('The member needs to join a voice channel first!');
        }
    },
};