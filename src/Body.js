import React from 'react';
import EventPlaceholder from './EventPlaceholder.js'
import EventList from './EventList.js'
import { BodyStyleWrapper } from './styleWrappers.js';

export default class Body extends React.Component {

  render() {

	  if ( this.props.isLoading ) { return < LoadingData /> }
	  if ( this.props.isError ) { return < NetworkError /> }

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

const LoadingData = () => {
	return (
		<div className="loaderContainer">
			<img alt="loading" src="./data/loader.gif" id="loader"/>
		</div>
	)
}

const NetworkError = () => <p id="error">Bohužial nastal problém so sieťou :(</p>
