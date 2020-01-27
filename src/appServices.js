
//  formating

export const formatDate = (s) => {

	const eventDate = tryCreateDateObject(s);
	const eventDay = eventDate.getDate();
	const eventMonth = eventDate.getMonth() + 1;
	const eventYear = eventDate.getFullYear();
	const today = new Date();

	if (
		today.getMonth() + 1 === eventMonth &&
		today.getFullYear() === eventYear
	) {
		const diff = today.getDate() - eventDay;
		if ( diff === 0 ) { return 'today' }
		if ( diff === 1  ) { return 'yesterday' }
		if ( diff === -1 ) { return 'tomorrow' }
	};

	return `${eventDay}. ${eventMonth}. ${eventYear}`;
}

const tryCreateDateObject = (s) => {

	const withDatePicker = new Date(s)
	if ( !isNaN(withDatePicker) ) { return withDatePicker }

	// safari
	const a = s.split('-');
	const withoutDatePicker = new Date(a[2], a[1] - 1, a[0])

	if (!!withoutDatePicker) { return withoutDatePicker }

	return s
}

//  sorting events

export const sortEvents = (events, date, abc) => {

	if ( date === null && abc === null ) { return events }

	if ( date === null ) {
		return abc ?
		events.sort((a,b) => compare(getTitle(a), getTitle(b))) :
		events.sort((a,b) => compare(getTitle(b), getTitle(a)));
	}

	if ( abc === null ) {
		return date ?
		events.sort((a,b) => compare(tryCreateDateObject(a.date), tryCreateDateObject(b.date))) :
		events.sort((a,b) => compare(tryCreateDateObject(b.date), tryCreateDateObject(a.date)));
	}
}

const getTitle = (t) => t.title.toLowerCase();

const compare = (a, b) => {
  if (a < b) { return -1 }
  if (a > b) { return 1 }
  return 0;
}

//  filtering events

export const countEvents = (type, events) => {
	const today = new Date().getTime();
	return events.filter( e => {
		const eventDay = new Date(e.date).getTime();
		return type === 'past' ? eventDay < today : today < eventDay;
	}).length;
}

export const filterEvents = (events, query) => {
	const q = query.toLowerCase();
	return events.filter( e => e.title.toLowerCase().includes(q))
}

// clicks

export const isItEnter = (e) => {

	if (e.type === 'keyup')
	{
		if (e.keyCode !== 13) { return false }
	}

	return true
}
