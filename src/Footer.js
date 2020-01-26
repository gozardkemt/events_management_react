import React from 'react';
import PropTypes from 'prop-types';
import { BarStyleWrapper } from './styleWrappers.js';
import { LanguageContext } from './LanguageContext.js';
import { countEvents, filterEvents } from './appServices.js';

export default class Footer extends React.Component {

  render() {

	  const { events, textQuery:query } = this.props;
	  const transl = this.context;

	  if (events.length === 0) { return null }

	  return (
		  <BarStyleWrapper>
		  	<span className="countTitle">
				{transl.eventsCount}: {filterEvents(events, query).length}
			</span>
		  	<span className="countTitle">
				{transl.pastEvents}: {countEvents('past',filterEvents(events, query))}
			</span>
		  	<span className="countTitle">
				{transl.futureEvents}: {countEvents('future',filterEvents(events, query))}
			</span>
		  </BarStyleWrapper>
	  )
	}
}

Footer.contextType = LanguageContext;

Footer.propTypes = {
	events: PropTypes.arrayOf(PropTypes.object).isRequired
}
