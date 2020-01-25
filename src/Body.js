import React from 'react';
import EventPlaceholder from './EventPlaceholder.js'
import EventList from './EventList.js'
import { BodyStyleWrapper } from './styleWrappers.js';

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
