const fs = require('fs');
const path = require('path');

module.exports = (category) => {
    let commands = [];
    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== 'command-base.js' && file !== 'load-commands.js') {
                const command = require(path.join(__dirname, dir, file));
                commands.push(command);
            }
        }
    }
    readCommands(category);
    return(commands)
}