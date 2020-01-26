import React from 'react';

export const dict = {
	en: {
		sort: 'Sort',
		oldest: 'From oldest',
		newest: 'From newest',
		events: 'Events',
		date: 'Date',
		eventDate: 'Event Date',
		eventsCount: 'Events Count',
		pastEvents: 'Overpassed',
		futureEvents: 'Forthcoming',
		addNewEvent: 'Add New Event',
		add: 'Confirm',
		cancel: 'Cancel',
		lang: 'sk',
		today: 'Today',
		tomorrow: 'Tomorrow',
		yesterday: 'Yesterday',
		networkError: 'We are sorry, something went wrong :('
	},
	sk: {
		sort: 'Zoradiť',
		oldest: 'Od najstarších',
		newest: 'Od najnovších',
		events: 'Podujatia',
		date: 'Dátum',
		eventDate: 'Dátum konania',
		eventsCount: 'Počet podujatí',
		pastEvents: 'Uplynulých',
		futureEvents: 'Nadchádzajúcich',
		addNewEvent: 'Pridaj novú udalosť',
		add: 'Pridať',
		cancel: 'Zrušiť',
		lang: 'en',
		today: 'Dnes',
		tomorrow: 'Zajtra',
		yesterday: 'Včera',
		networkError: 'Bohužial nastal problém so sieťou :('
	}
}

export const LanguageContext = React.createContext( dict.sk )
