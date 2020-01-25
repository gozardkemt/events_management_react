import React from 'react';
import { BarStyleWrapper } from './styleWrappers.js';

export default class Footer extends React.Component {

  render() {

	  return (
		  <BarStyleWrapper>
		  	<span className="countTitle">
				Počet podujatí: {this.props.countEvents}
			</span>
		  </BarStyleWrapper>
	  )
	}
}
