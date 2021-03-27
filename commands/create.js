module.exports = {
	name: 'create',
	description: 'create new event',
	execute(message, args) {
		//reuiring utils
		const getDate = require("./../utilities/getDate").getDate;
		const getStringFromDate = require("./../utilities/getStringFromDate");

		// requiring schema 
		const Event = require("./../schemas/eventSchema").Event;

		// signaling the script is starting
		message.channel.send('I am creating the event ...');

		// preparing variables
		const date = args[0];
		const location = args[1];
		const latLong = args[2];

		//checking if required arguments are provided:
		if (args.length < 2) {
			message.channel.send("One or more missing arguments, exiting command plese try again and provide all required arguments -> type '! help' for help");
			return;
		}

		//preparing date
		const myTimestamp = getDate(date);

		// if provided prepare coords
		let lat = null;
		let long = null;

		if (latLong) {
			console.log("provided");
			const coordArr = latLong.split(';');
			lat = coordArr[0];
			long = coordArr[1];
		}

		// creating new event
		const newEvent= new Event({date: myTimestamp, location: location, lat: lat, long: long, reminded: false, advertise: false});

		// storing new event
		newEvent.save()
			.then((doc)=>{
				// sending feedback
				message.channel.send("Event created successfully");
				message.channel.send(
					`### Event specifications: \n`+
					`-> eventId: ${doc._id.toString()} \n`+
					`-> Date: ${getStringFromDate(new Date(doc.date))} \n` +
					`-> Location: ${doc.location} \n`+
					`-> Lat: ${doc.lat ? doc.lat : "Not provided"} \n`+
					`-> Long: ${doc.long ? doc.long : "Not provided"} \n` +
					`To add participants to this event type: "! add ${doc._id.toString()} <nome-partecipante>"`);
			})
			.catch((err)=>{
				console.log(err);
				message.channel.send("Impossible to add event to the db, contact the administrator");
			});

	},
};