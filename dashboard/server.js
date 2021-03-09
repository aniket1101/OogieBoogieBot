const express = require('express');
const app = express()
const Discord = require('discord.js');
require('dotenv').config();
require('./keep-alive');

let mongoose = require('../utils/mongoose');
mongoose.init()
const activitySchema = require('../models/server-activity-schema');

require('module-alias/register');

const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

const countCommands = require('../commands/count-commands')
const listCommands = require('../commands/list-commands')

app.use(express.static(`${__dirname}/assets`));
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))
app.set('views', __dirname + '/views');

app.set('view engine', 'pug');

let totalMessages = 0;
let totalVoice = 0;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const updateStats = () => {
    let tempTotalMessages = 0;
    let tempTotalVoice = 0;
    let num = 0;

    client.guilds.cache.array().forEach(async (guild, index) => {
        let activityCollection = activitySchema(guild.id);

        activityCollection.find().then(collection => {
            num++;
            collection.forEach(activity => {
                tempTotalMessages += activity.messages;
                tempTotalVoice += activity.voice;
            })
            if (num === client.guilds.cache.array().length) {
                totalMessages = tempTotalMessages;
                totalVoice = tempTotalVoice;
            }
        })
    })
}
updateStats();

app.get('/', async (req, res) => {
    const numCommands = countCommands();
    // console.log(totalMessages, totalVoice)
    res.render('index', {
        servers: client.guilds.cache.size,
        channels: client.channels.cache.size,
        members: client.users.cache.size,
        commands: numCommands,
        totalMessages: numberWithCommas(totalMessages),
        totalVoice: numberWithCommas(Math.round(totalVoice / 3600)),
    })

    updateStats();
});

let categoryNames = ['config', 'fun', 'info', 'stats', 'mod', 'voice', 'image', 'game', 'economy']
let categories = categoryNames.map(category => {
    return {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        commands: listCommands(`commands/${category} commands`)
    }
})
nsfwCommands = listCommands('commands/nsfw commands')

app.get('/commands', (req, res) => {
    res.render('commands', {
        categories: categories,
        nsfwCommands: nsfwCommands
    })
});

app.get('/invite', (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=789960873203990598&permissions=3072&scope=bot');
})

app.get('/support', (req, res) => {
    res.redirect('https://discord.com/invite/ph5DVfFmeX');
})

app.get('/privacypolicy', (req, res) => {
    res.render('privacypolicy')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is live on port ${port} \n`)

    updateStats();

})