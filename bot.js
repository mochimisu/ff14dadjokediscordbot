var Discord = require('discord.io');
var fs = require('fs');
var config = require('./config.json');

// Jokes
var jokes = fs.readFileSync(config.jokes).toString().split('\n');
function randomJoke() {
    return jokes[Math.floor(Math.random()*jokes.length)];
}

// Bot
var bot = new Discord.Client({
    autorun: true,
    token: config.token
});

// Automatic interval
bot.on('ready', function() {
  var interval = setInterval (function (){
    bot.sendMessage({
      to: config.channelID,
      message: randomJoke()
    });
  }, config.interval);
});

// On message trigger
bot.on('message', function(user, userID, channelID, message, event) {
  if (message === "dad joke") {
    bot.sendMessage({
      to: channelID,
      message: randomJoke()
    });
  }
});
