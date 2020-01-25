import React from 'react';
import { EventStyleWrapper } from './styleWrappers.js';

export default class EventPlaceholder extends React.Component {

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
