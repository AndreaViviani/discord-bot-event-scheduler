// discord
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// config
const config = require('./config.json');

// loading .env var
require('dotenv').config();

//mongodb/mongoose
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@${process.env.DB_CLUSTER}/EventScheduler?retryWrites=true&w=majority`;

//fs
const fs = require("fs");

// requiring schema:
const Event = require("./schemas/eventSchema").Event;

//importing utils
const getStringFromDate = require("./utilities/getStringFromDate");

try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
} catch (error) {
    console.log(error);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);

/*client.on('message', message => {
    if (message.content.startsWith("!")) {
        const messageArray = message.content.split(" ");
        const command = messageArray[1];
        messageArray.splice(0, 2);
        console.log(messageArray);
    }
});*/

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    //checkin if the message is for the bot
    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return
    }

    // extracting command and arguments
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        message.channel.send("Command not found");
    };

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})

const sleep = ms => new Promise(res => setTimeout(res, ms));

(async function () {
    while (true) {  // check forever
        console.log("controllo");
        await sleep(43200000);
        Event.find({})
            .then((docs) => {
                for (const doc of docs) {
                    if ((doc.date - new Date().getTime()) < 259200000) {
                        client.channels.fetch(process.env.CHANNELID)
                            .then((channel) => {
                                channel.send("Ricorda di dare la tua disponibilità!")
                                channel.send(
                                    "Prossimo evento in programma: \n" +
                                    `-> eventId: ${doc._id.toString()} \n` +
                                    `-> Date: ${getStringFromDate(new Date(doc.date))}\n` +
                                    `-> Location: ${doc.location} \n` +
                                    `-> N. Partecipanti: ${doc.participants.length} \n ` +
                                    `Per aggiungere un partecipante a questo evento "! add ${doc._id} <nome-partecipante>"\n`
                                )
                            })
                            .catch((err) => { console.log(err) })

                    }
                }
            })
    }
})();

