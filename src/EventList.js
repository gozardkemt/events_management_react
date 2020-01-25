import React from 'react';
import { formatDate, sortEvents } from './appServices.js';
import { EventStyleWrapper } from './styleWrappers.js';

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
		<EventStyleWrapper>
			< EventDate date={date} />
			< EventTitle title={title} />
		</EventStyleWrapper>
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

const EventDate = ({date}) => {

	return (
		<div style={{padding: '0 1.5rem'}}>
			<small>Dátum konania:</small>
			<p style={{margin: 'unset'}}>{formatDate(date)}</p>
		</div>
	)
}
