const Discord = require('discord.js');
const bot = new Discord.Client();
let config = require('./botconfig.json');
var fs = require("fs");
var util = require('util');
var logFile = fs.createWriteStream('logs.txt', { flags: 'a' });
var logStdout = process.stdout;
const Gamedig = require("gamedig");
const { MessageEmbed } = require('discord.js');

            
bot.on('message', async message => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "dm") return;
        if (message.channel.id === config.mainServer.channelId) {
            config.resendMessageTo.map(server => {
                bot.channels.get(server.channelId).send(message.content, {
                    file: message.attachments.first() === undefined ? '' : message.attachments.first().url
                })
                console.log(message.author.tag + " sent ic info in" + new Date());
            });
        }
    } catch (e) {
        console.log(e)
    }

  console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;
});


bot.login('process.env.BOT_TOKEN');