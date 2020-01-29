import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { EventPlaceholder } from './EventPlaceholder.js';
import { LanguageContext } from './LanguageContext.js';
import { BodyStyleWrapper } from './styleWrappers.js';
import { EventList } from './EventList.js';
import loaderSrc from './img/loader.gif';

export const Body = ({data, order, addNewEvent, newEventActive, newTitle, newDate, comfirmNewEvent, removeNewEvent, inputRef, textQuery}) => {

	const dict = useContext(LanguageContext);

	if ( data.isLoading ) { return < LoadingData /> }
	if ( data.isError ) {
		return < NetworkError
	  		errorText={dict.networkError}
			/>
	}

	return (
	  <BodyStyleWrapper>
	  	<EventPlaceholder
			newEventActive={newEventActive}
			newTitle={newTitle}
			newDate={newDate}
			addNewEvent={addNewEvent}
			comfirmNewEvent={comfirmNewEvent}
			removeNewEvent={removeNewEvent}
			inputRef={inputRef}
			/>
		<EventList
			events={data.events}
			order={order}
			textQuery={textQuery.value}
			/>
	  </BodyStyleWrapper>
	)

}

const LoadingData = () => {
	return (
		<div className="loaderContainer">
			<img alt="loading" src={loaderSrc} id="loader"/>
		</div>
	)
}

const NetworkError = ({errorText}) => <p id="error">{errorText}</p>


Body.propTypes = {
	data: PropTypes.object.isRequired,
	order: PropTypes.objectOf(PropTypes.bool),
	addNewEvent: PropTypes.func.isRequired,
	newEventActive: PropTypes.bool.isRequired,
	newTitle: PropTypes.object.isRequired,
	newDate: PropTypes.object.isRequired,
	textQuery: PropTypes.object.isRequired,
	comfirmNewEvent: PropTypes.func.isRequired,
	removeNewEvent: PropTypes.func.isRequired,
	inputRef: PropTypes.shape({
		current: PropTypes.instanceOf(Element),
	}).isRequired
}
