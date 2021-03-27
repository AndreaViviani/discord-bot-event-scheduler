module.exports = {
    name: "delete",
    description: "delete an event",
    execute(message, args) {
        // requiring model
        const Event = require("./../schemas/eventSchema").Event;

        //requirig utils
        const getStringFromDate = require("./../utilities/getStringFromDate");

        if (args.length === 0) {
            message.channel.send("Deleting all scheduled events... Hope you know what you are doing");
            Event.deleteMany({})
                .then((docs) => {
                    console.log(docs);
                    message.channel.send(
                        `Cancellati ${docs.deletedCount} eventi.`
                    )
                })
                .catch((err) => {
                    console.log(err);
                    message.channel.send(
                        "Impossible to delete events, an error occurred, contact admin or try again"
                    )
                });
        } else {
            message.channel.send(`Deleting event with id: ${args[0]}`);
            Event.findByIdAndDelete(args[0])
                .then((doc) => {
                    console.log(doc);
                    if (doc) {
                        message.channel.send(
                            `### Cancellato evento:\n` +
                            `Date: ${getStringFromDate(new Date(doc.date))} \n` +
                            `Location: ${doc.location}`
                        )
                    } else {
                        message.channel.send(
                            "Evento non esistente"
                        )
                    }

                })
                .catch((err) => {
                    console.log(err);
                    message.channel.send("An error occurred, impossible to delete event, contact admin");
                })
        }

    }
}

