require('dotenv').config()
const Discord = require("discord.js");
const redditImageFetcher = require('reddit-image-fetcher');

const client = new Discord.Client();
const prefix = "!";

client.on("ready", () => {
    console.log("Memeya is woke up!")
})

client.on("message", message => { 

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // ping
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! Your message had a latency of ${timeTaken}ms.`);               
    }

    // calc
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    } 

    // avatar
    else if (command === 'avatar') {
      message.reply(message.author.displayAvatarURL());
    }

    // wallpapers
    else if (command === "wallpapers") {
        setInterval(() => 
        redditImageFetcher.fetch({
            type: 'wallpaper',
            total: 1,
        }).then(
            result => { 
                result.map(function(result){
                message.reply(`@everyone ${result.image}`);
            })}), 5000);

    }

    else if (command === "memes") {
        setInterval(() => 
        redditImageFetcher.fetch({
            type: 'meme',
            total: 1,
        }).then(
            result => { 
                result.map(function(result){
                message.reply(`@everyone ${result.image}`);
            })}), 5000);
    }

});   

client.login(process.env.BOT_TOKEN)