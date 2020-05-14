// Copyright (c) 2019 Pessi Päivärinne
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

require('dotenv').config()
const Discord = require('discord.js');
const morse = require('morse');
const config = require('./config.json');

const client = new Discord.Client();
var prefix = config.prefix

// Logging stuff
process.on('beforeExit', code => {
  // Can make asynchronous calls
  setTimeout(() => {
    console.log(`Process will exit with code: ${code}`)
    process.exit(code)
  }, 100)
})

process.on('exit', code => {
  // Only synchronous calls
  console.log(`Process exited with code: ${code}`)
})

process.on('beforeExit', code => {
  // Can make asynchronous calls
  setTimeout(() => {
    console.log(`Process will exit with code: ${code}`)
    process.exit(code)
  }, 100)
});

process.on('exit', code => {
  // Only synchronous calls
  console.log(`Process exited with code: ${code}`)
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.TOKEN);

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
        morseResp = morse.decode(msg.content);
        // console.log(morseResp);
        // console.log(morseResp.length);
        if (morseResp === '  ') {
            return msg.channel.send('There was a syntax error in your message. Make sure your message consist only of morse code.');
        }
        else {
            return msg.channel.send(morseResp)
        }
    }
    //encode command
    else if (command === 'e') {
        if (!args.length) {
            return msg.channel.send('You didn\'t provide any text for me to encode');
        }
        return msg.channel.send(morse.encode(args.join(' ')));
    }
})