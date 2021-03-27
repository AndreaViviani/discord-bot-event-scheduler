module.exports = {
    name: "info",
    description: "retrieve info on target event",
    execute(message, args) {

        // requiring schema:
        const Event = require("./../schemas/eventSchema").Event;

        //requiring utils
        const getStringFromDate = require("./../utilities/getStringFromDate");

        if (args.length === 0) {
            message.channel.send("Retrieving infos on all events...");
            // retrieve and display all events
            Event.find({})
                .then((docs) => {
                    let areDocs = false;
                    for (const doc of docs) {
                        // se l'evento deve ancora arrivare
                        if (doc.date > new Date().getTime()) {
                            areDocs = true;
                            message.channel.send(
                                `-> eventId: ${doc._id.toString()} \n` +
                                `-> Date: ${getStringFromDate(new Date(doc.date))} \n` +
                                `-> Location: ${doc.location} \n` +
                                `-> N. Partecipanti: ${doc.participants.length} \n`
                            )
                        }

                    }
                    if (!areDocs) {
                        message.channel.send(
                            "Nessun evento in programma."
                        )
                    }
                })
                .catch((err) => {
                    console.log(err);
                    message.channel.send("Impossible to retrieve infos, contact admin pls");
                })
        } else {
            if (args[0] === "next") {
                message.channel.send("Retrieving infos on the next event...");
                // retrieve and displays the next event
                Event.find({})
                    .then((docs) => {
                        // putting all next events in an array
                        let nextEvent = false;
                        const participants = [];
                        for (const doc of docs){
                            if (doc.date > new Date().getTime()){
                                if (!nextEvent) {
                                    nextEvent = doc;
                                } else {
                                    if (nextEvent.date > doc.date) {
                                        nextEvent = doc;
                                    }
                                }
                            }
                        }
                        for (const participant of nextEvent.participants) {
                            participants.push(participant.name);
                        }
                        message.channel.send(
                            "### Questo è il prossimo evento: \n" + 
                            `-> eventId: ${nextEvent._id.toString()} \n` +
                            `-> Date: ${getStringFromDate(new Date(nextEvent.date))}\n` +
                            `-> Location: ${nextEvent.location} \n` +
                            `-> N. Partecipanti: ${nextEvent.participants.length} \n ` +
                            `-> Partecipanti: ${participants.join()} \n` +
                            `Per aggiungere un partecipante a questo evento "! add ${nextEvent._id} <nome-partecipante>"\n`
                        )
                        if (nextEvent.lat && nextEvent.long) {
                            message.channel.send(
                                "Indicazioni stradali: \n" +
                                `https://www.google.com/maps/dir/@api=1&map_action=map&destination=${nextEvent.lat},${nextEvent.long}`
                            )
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        message.channel.send("Impossible to retrieve infos, contact admin pls")
                    })
            } else {
                message.channel.send("retrievinbg infos on the event with id " + args[0]);
                Event.findById(args[0])
                    .then((doc)=>{
                        const participants = [];
                        for (const participant of doc.participants) {
                            participants.push(participant.name);
                        }
                        message.channel.send(
                            "### Questo è l'evento richiesto: \n" + 
                            `-> eventId: ${doc._id.toString()} \n` +
                            `-> Date: ${getStringFromDate(new Date(doc.date))}\n` +
                            `-> Location: ${doc.location} \n` +
                            `-> N. Partecipanti: ${doc.participants.length} \n ` +
                            `-> Partecipanti: ${participants.join()} \n` +
                            `Per aggiungere un partecipante a questo evento "! add ${doc._id} <nome-partecipante>"\n`
                        )
                        if (doc.lat && doc.long) {
                            message.channel.send(
                                "Indicazioni stradali: \n" +
                                `https://www.google.com/maps/dir/@api=1&map_action=map&destination=${doc.lat},${doc.long}`
                            )
                        }
                    })
                    .catch((err)=> {
                        console.log(err);
                        message.channel.send("Impossible to retrieve infos, contact admin pls");
                    })
            }
        }


    }
}