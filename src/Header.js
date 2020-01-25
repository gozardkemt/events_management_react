import React from 'react';
import { BarStyleWrapper } from './styleWrappers';

export default class Header extends React.Component {

	render() {

		const {
			sortAbc,
			sortDates,
			order
		} = this.props;

		return (
			<>
				<h1 className="title">Podujatia</h1>
				< FilterBar
					sortAbc={sortAbc}
					sortDates={sortDates}
					order={order}
					/>
			</>
		)
	}
}

class FilterBar extends React.Component {
	render() {

		const { sortAbc, sortDates, order } = this.props;

		const dateButton = order.date ? 'Od najnovších' : 'Od najstarších';
		const abcButton = order.abc ? 'Xyz' : 'Abc';

		return (
			< BarStyleWrapper >
				<span className="sortTitle">Zoradiť:</span>
				<span className="sortIcons" onClick={sortDates}>{dateButton}</span>
				<span className="sortIcons" onClick={sortAbc}>{abcButton}</span>
			</ BarStyleWrapper >
		)
	}
}
