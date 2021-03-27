module.exports = {
	name: 'add',
	description: 'add a participant to an event',
	execute(message, args) {
        // taking args
        const eventId = args[0];
        const participantName = args[1];

        // requiring schema:
        const Event = require("./../schemas/eventSchema").Event; 

        //requiring utils
        const getStringFromDate = require("./../utilities/getStringFromDate");


        Event.findByIdAndUpdate({_id: eventId}, { $push:{participants: {name: participantName }}})
            .then((doc)=> {
                message.channel.send("Event successfully updated");
                message.channel.send(
                    "### Event specification: \n" + 
                    `-> eventId: ${doc._id.toString()} \n`+
                    `-> Date: ${getStringFromDate(new Date(doc.date))} \n` +
                    `-> Location: ${doc.location} \n` +
                    `-> N. partecipanti: ${doc.participants.length + 1 } \n\n` +
                    `To retrieve more infos about this event type: "! info ${doc.id.toString()}"`
                )
            })
            .catch((err)=>{
                console.log(err);
                message.channel.send("impossible to update db, contact admin");
            })

    },
};