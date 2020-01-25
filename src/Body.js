import React from 'react';
import { formatDate, sortEvents } from './appServices.js';
import { EventStyleWrapper, BodyStyleWrapper } from './styleWrappers.js';

export default class Body extends React.Component {

  render() {

	  const {
		  events,
		  order,
		  addNewEvent,
		  newEventActive,
		  newTitle,
		  newDate,
		  handleTyping,
		  comfirmNewEvent,
		  removeNewEvent,
		  inputRef
	  } = this.props;

	  return (
		  <BodyStyleWrapper>
		  	<EventPlaceholder
				addNewEvent={addNewEvent}
				newEventActive={newEventActive}
				newTitle={newTitle}
				newDate={newDate}
				handleTyping={handleTyping}
				comfirmNewEvent={comfirmNewEvent}
				removeNewEvent={removeNewEvent}
				inputRef={inputRef}
				/>
			<EventList
				events={events}
				order={order}
				/>
		  </BodyStyleWrapper>
	  )
	}
}

class EventPlaceholder extends React.Component {

  render() {
	  const {
		  addNewEvent,
		  newEventActive,
		  newDate,
		  newTitle,
		  handleTyping,
		  comfirmNewEvent,
		  removeNewEvent,
		  inputRef
	  } = this.props;

	  if ( !newEventActive ) { return < AddNewEvent addNewEvent={addNewEvent} /> }

	  return  ( < EventInput
		  			newTitle={newTitle}
					newDate={newDate}
					inputRef={inputRef}
					handleTyping={handleTyping}
					comfirmNewEvent={comfirmNewEvent}
					removeNewEvent={removeNewEvent}
					/>
				)
	}
}

const AddNewEvent = ({addNewEvent}) => {
	return (
		<article className="addEvent" onClick={addNewEvent}>
		  	<span style={{margin:'auto'}}>Pridaj novú udalosť</span>
		</article>
	)
}

class EventInput extends React.Component {

	componentDidMount() {
		this.props.inputRef.current.focus();
		this.listenToComfirm('click', 'keyup')
	}

	componentWillUnmount() {
		this.unlistenToComfirm('click', 'keyup')
	}

	listenToComfirm = (...eventTypes) => {
		eventTypes.map( (type) =>
			document.addEventListener(type, this.props.comfirmNewEvent)
		)
	}

	unlistenToComfirm = (...eventTypes) => {
		eventTypes.map( (type) =>
			document.removeEventListener(type, this.props.comfirmNewEvent)
		)
	}

	render() {
		const {
			newTitle,
			newDate,
			handleTyping,
			inputRef,
			removeNewEvent
		} = this.props;

		return (
			<EventStyleWrapper >
				<input className="input" type="date" value={newDate} onChange={handleTyping} />
				<input className="input" ref={inputRef} type="text" value={newTitle} onChange={handleTyping} />
				<span className="removeEvent" onClick={removeNewEvent}>Vymazať</span>
			</EventStyleWrapper >
		)
	}

}

class EventList extends React.Component {

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
