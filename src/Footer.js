import React from 'react';
import { BarStyleWrapper } from './styleWrappers.js';
import { countEvents } from './appServices.js';

export default class Footer extends React.Component {

  render() {

	  const { events } = this.props;
	  if (events.length === 0) { return null }

	  return (
		  <BarStyleWrapper>
		  	<span className="countTitle">
				Počet podujatí: {events.length}
			</span>
		  	<span className="countTitle">
				Uplynulých: {countEvents( 'past' ,events)}
			</span>
		  	<span className="countTitle">
				Nadchádzajúcich: {countEvents( 'future' ,events)}
			</span>
		  </BarStyleWrapper>
	  )

	}
}
