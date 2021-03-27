module.exports = {
	name: 'help',
	description: 'display commands and descriptions',
	execute(message, args) {
		message.channel.send( 
        "Ciao, questi sono i comandi disponibili: \n \n" +
        /*first command*/'- create: creo un nuovo evento. ### argomenti: \n --- data-> format: dd/mm/aaaaThh:mm \n --- location: string \n --- coord: lat;long [optional] \n \n' +
        /*second command*/'- add: aggiungo un partecipante ad un evento. ### argomenti: \n --- event id \n --- nome partecipante \n \n' +
        /*third command*/'- info: dispay infos on one or all events. ### argomenti: \n --- event id [optional, if not provided display all events] or next (visualizza il prossimo evento) \n\n' +
        /*4th command*/ '- delete: delete an event or all event ### argomenti: \n --- event id [optional, if not provided delete all events] \n\n' +
        /*5th command */ '- remove: remove one or all participant from an event ### argomenti: \n ---event id [required] \n participant name [optional, if not provided remove all] \n\n\n' +
        /* usage */ '### general usage: \n' +
        '! <command> <agument1> <argument2> \n\n'+
        /*usage examples*/
        'usage examples: \n' +
        '! info next -->> displays info on the next vent \n' +
        '! add uh94f8h2 Andrea -->> aggiunge Andrea all evento uh94f8h2'
        );
	},
};