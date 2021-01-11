module.exports = {
    name: 'ping',
    description: 'Gives the bot\'s ping.',
    
    execute(message, args) {
        let botping = Math.round(message.client.ws.ping);

        message.channel.send(`Pong! ${botping}ms`);
    },
};