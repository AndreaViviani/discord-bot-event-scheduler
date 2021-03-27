module.exports = {
    name: "remove",
    description: "remove one or more participants from an event",
    execute(message, args) {
        // requiring schema:
        const Event = require("./../schemas/eventSchema").Event;

        //requiring utils
        const getStringFromDate = require("./../utilities/getStringFromDate");

        const eventId = args[0];
        
        if (args.length === 1) {
            //remove all participants from event
            message.channel.send(
                `Removing all participants from event: ${eventId} ...`
            )
            Event.findByIdAndUpdate(eventId, {participants: []})
                .then( (doc)=>{
                    message.channel.send(
                        `Partecipante rimosso con successo`
                    )
                    message.channel.send(
                        `Type "! info ${doc._id}" to retrieve information about the event and remaining participants`
                    )
                })
                .catch((err)=> {
                     console.log(err);
                     message.channel.send(
                         "impossible to remove participants, an error occurred, contact admin"
                     )
                })
        } else if (args.length === 2) {
            const participantToRemove = args[1];
            const updatedParticipants = [];
            message.channel.send(
                `Removing ${participantToRemove} from event ${eventId} ...`
            )
            Event.findById(eventId)
                .then((doc)=> {
                    for(const participant of doc.participants) {
                        if (participant.name === participantToRemove){
                            continue;
                        } else {
                            updatedParticipants.push(participant);
                        }
                    }
                })
            Event.findByIdAndUpdate({_id: eventId}, {participants: updatedParticipants})
                .then((doc)=>{
                    message.channel.send(
                        `Participant ${participantToRemove} removed successfully` +
                        ` from event ${eventId}`
                    )
                    message.channel.send(
                        `Type "! info ${eventId}" to retrieve information about the event and remaining participants`
                    )
                })
                .catch((err)=>{
                    console.log(err);
                    message.channel.send(
                        "impossible to remove participants, an error occurred, contact admin"
                    )
                })

        } else{
            message.channel.send(
                "Pochi o troppi argomenti forniti. \n" +
                "Type '! help' for usage"
            )
        }
    }
}