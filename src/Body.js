import React from 'react';
import { formatDate, sortEvents } from './appServices.js';
import { EventStyleWrapper, firstArticleToAdd, BodyStyleWrapper } from './styleWrappers.js';


export default class Body extends React.Component {

  render() {

	  const { events, orderAbc, orderDate, addNewEvent } = this.props;

	  return (
		  <BodyStyleWrapper>
		  	<AddNewEvent
				addNewEvent={addNewEvent}
				/>
			<EventList
				events={events}
				orderAbc={orderAbc}
				orderDate={orderDate}
				/>
		  </BodyStyleWrapper>
	  )
	}
}

class AddNewEvent extends React.Component {

  render() {
	  const { addNewEvent } = this.props;
	  console.log(addNewEvent);
	  return (
		  <article style={firstArticleToAdd} onClick={addNewEvent}>
		  	<span style={{margin:'auto'}} >Pridaj novú udalosť</span>
		  </article>

	  )
	}
}

class EventList extends React.Component {

	render() {
		const { events, orderDate, orderAbc } = this.props;

		if (events.length === 0) { return null }

		const sorted = sortEvents(events, orderDate, orderAbc );

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
		<hgroup>
			{title.split('-').map((name, i) => {

				const fontSize = name.trim() === 'meetup' ? '0.9rem' : '1rem';
				const bold = i === 0 ? 'underline' : 'normal';
				const style = { margin: 'unset', fontSize: fontSize, textDecoration: bold }

				return <p key={i} style={style}>{name.trim()}</p>
			})}
		</hgroup>

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
