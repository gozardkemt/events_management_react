import React from 'react';
import { EventStyleWrapper } from './styleWrappers.js';
import { LanguageContext } from './LanguageContext.js';

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

class AddNewEvent extends React.Component {

	render() {
		return (
			<article className="addEvent" onClick={this.props.addNewEvent}>
			  	<span style={{margin:'auto'}}>{this.context.addNewEvent}</span>
			</article>
		)
	}
}

class EventInput extends React.Component {

	componentDidMount() {
		this.props.inputRef.current.focus();
		document.addEventListener('keyup', this.props.comfirmNewEvent)
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.props.comfirmNewEvent)
	}

	render() {
		const {
			newTitle,
			newDate,
			handleTyping,
			inputRef,
			removeNewEvent,
			comfirmNewEvent
		} = this.props;

		return (
			<EventStyleWrapper >
				<input className="input" id="newDate" placeholder="dd-mm-yyyy" type="date" value={newDate} onChange={handleTyping} />
				<input className="input" id="newTitle" ref={inputRef} type="text" value={newTitle} onChange={handleTyping} />
				<div className="eventButtons">
					<span onClick={comfirmNewEvent}>{this.context.add}</span>
					<span onClick={removeNewEvent}>{this.context.cancel}</span>
				</div>
			</EventStyleWrapper >
		)
	}

}

AddNewEvent.contextType = LanguageContext;
EventInput.contextType = LanguageContext;
