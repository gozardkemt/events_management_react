import React from 'react';
import { formatDate, sortEvents } from './appServices.js';
import { EventStyleWrapper, EventDateStyleWrapper } from './styleWrappers.js';
import { LanguageContext } from './LanguageContext.js';

export default class EventList extends React.Component {

	render() {
		const { events, order } = this.props;

		if (events.length === 0) { return null }

		const sorted = sortEvents(events, order.date, order.abc);

		return sorted.map( (e, i) => < Event key={i} title={e.title} date={e.date} /> )
	}
}

const Event = ({title, date}) => {

	return (
		< EventStyleWrapper >
			< EventDate date={date} />
			< EventTitle title={title} />
		</ EventStyleWrapper >
	)
}

const EventTitle = ({title}) => {

	return (
		<div>
			{title.split('-').map((name, i) => {

				const size = name.trim() === 'meetup' ? '0.9rem' : '1rem';
				const line = i === 0 ? 'underline' : 'normal';
				const style = { margin: 'unset', fontSize: size, textDecoration: line }

				return <p key={i} style={style}>{name.trim()}</p>
			})}
		</div>

	)
}

class EventDate extends React.Component {

	render() {

		const transl = this.context;
		const date = formatDate(this.props.date);

		const isToday = date === 'today',
		 	  isTomor = date === 'tomorrow',
			  isYestr = date === 'yesterday';

		return (
			< EventDateStyleWrapper >
				<small>{this.context.eventDate}</small>
				<p style={{margin: 'unset'}}>{
					isToday || isTomor || isYestr ? transl[date] : date
				}</p>
			</ EventDateStyleWrapper >
		)
	}
}

EventDate.contextType = LanguageContext;
