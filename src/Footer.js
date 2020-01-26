import React from 'react';
import PropTypes from 'prop-types';
import { BarStyleWrapper } from './styleWrappers.js';
import { LanguageContext } from './LanguageContext.js';
import { countEvents } from './appServices.js';

export default class Footer extends React.Component {

  render() {

	  const { events } = this.props;
	  const transl = this.context;

	  if (events.length === 0) { return null }

	  return (
		  <BarStyleWrapper>
		  	<span className="countTitle">
				{transl.eventsCount}: {events.length}
			</span>
		  	<span className="countTitle">
				{transl.pastEvents}: {countEvents( 'past', events)}
			</span>
		  	<span className="countTitle">
				{transl.futureEvents}: {countEvents( 'future', events)}
			</span>
		  </BarStyleWrapper>
	  )

	}
}

Footer.contextType = LanguageContext;

Footer.propTypes = {
	events: PropTypes.arrayOf(PropTypes.object).isRequired
}
