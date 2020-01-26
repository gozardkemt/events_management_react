import React from 'react';
import PropTypes from 'prop-types';
import EventPlaceholder from './EventPlaceholder.js'
import { LanguageContext } from './LanguageContext.js'
import EventList from './EventList.js'
import { BodyStyleWrapper } from './styleWrappers.js';
import loaderSrc from './img/loader.gif'

export default class Body extends React.Component {

  render() {

	  if ( this.props.isLoading ) { return < LoadingData /> }
	  if ( this.props.isError ) {
			return < NetworkError
		  		errorText={this.context.networkError}
				/>
		}

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
		  inputRef,
		  textQuery
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
				textQuery={textQuery}
				/>
		  </BodyStyleWrapper>
	  )
	}
}

const LoadingData = () => {
	return (
		<div className="loaderContainer">
			<img alt="loading" src={loaderSrc} id="loader"/>
		</div>
	)
}

const NetworkError = ({errorText}) => <p id="error">{errorText}</p>

Body.contextType = LanguageContext;

Body.propTypes = {
	events: PropTypes.arrayOf(PropTypes.object),
	order: PropTypes.objectOf(PropTypes.bool),
	addNewEvent: PropTypes.func.isRequired,
	newEventActive: PropTypes.bool.isRequired,
	newTitle: PropTypes.string,
	newDate: PropTypes.string,
	handleTyping: PropTypes.func.isRequired,
	comfirmNewEvent: PropTypes.func.isRequired,
	removeNewEvent: PropTypes.func.isRequired,
	inputRef: PropTypes.shape({
		current: PropTypes.instanceOf(Element),
	}).isRequired
}
