import React from 'react';
import { FilterBarStyleWrapper, titleStyle, orderIconStyle, orderTitleStyle } from './styleWrappers';

export default class Header extends React.Component {

	render() {

		const {
			sortAbc,
			sortDates,
		} = this.props;

		return (
			<>
				<h1 style={titleStyle}>Podujatia</h1>
				< FilterBar
					sortAbc={sortAbc}
					sortDates={sortDates}
					/>
			</>
		)
	}
}

class FilterBar extends React.Component {
	render() {
		const { sortAbc, sortDates } = this.props;

		return (
			< FilterBarStyleWrapper >
				<span style={orderTitleStyle}>Zoradiť:</span>
				<span style={orderIconStyle} onClick={sortDates}>&uarr;&darr;</span>
				<span style={orderIconStyle} onClick={sortAbc}>Abc</span>
			</ FilterBarStyleWrapper >
		)
	}
}
