const Discord = require('discord.js');
const morse = require('morse');
const config = require('./config.json');

const client = new Discord.Client();
var prefix = config.prefix

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(config.token)

client.on('message', msg => {
    //validate message
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    //create args and command string
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    //help command
    if (command === 'help') {
        return msg.channel.send('Usage is pretty easy: use !m.d to decode and !m.e to encode.')
    }
    //decode command
    else if (command === 'd') {
        if (!args.length) {
            return msg.channel.send('You didn\'t provide any morse code for me to decode');
        }
        return msg.channel.send(morse.decode(args.join(' ')));
    }
    //encode command
    else if (command === 'e') {
        if (!args.length) {
            return msg.channel.send('You didn\'t provide any text for me to encode');
        }
        return msg.channel.send(morse.encode(args.join(' ')));
    }
})