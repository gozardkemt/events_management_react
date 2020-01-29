import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { BarStyleWrapper } from './styleWrappers.js';
import { LanguageContext } from './LanguageContext.js';
import { countEvents, filterEvents } from './appServices.js';

export const Footer = ({ events, textQuery:query }) => {

	const dict = useContext(LanguageContext);

	if (events.length === 0) { return null }

	const filteredEvents = filterEvents(events, query);

	return (
	  <BarStyleWrapper>
	  	<span className="countTitle">
			{dict.eventsCount}: {filteredEvents.length}
		</span>
	  	<span className="countTitle">
			{dict.pastEvents}: {countEvents('past', filteredEvents)}
		</span>
	  	<span className="countTitle">
			{dict.futureEvents}: {countEvents('future', filteredEvents)}
		</span>
	  </BarStyleWrapper>
	)

}

Footer.propTypes = {
	events: PropTypes.arrayOf(PropTypes.object).isRequired
}
