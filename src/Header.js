import React from 'react';
import { BarStyleWrapper } from './styleWrappers';
import { LanguageContext } from './LanguageContext.js'

export default class Header extends React.Component {

	render() {

		const {
			sortAbc,
			sortDates,
			order,
			changeLang
		} = this.props;

		return (
			<>
				<h1 className="title">{this.context.events}</h1>
				< FilterBar
					sortAbc={sortAbc}
					sortDates={sortDates}
					order={order}
					changeLang={changeLang}
					/>
			</>
		)
	}
}

class FilterBar extends React.Component {
	render() {

		const { sortAbc, sortDates, order, changeLang } = this.props;

		const dateButton = order.date ? 'newest' : 'oldest';
		const abcButton = order.abc ? 'Xyz' : 'Abc';
		const transl = this.context;

		console.log(this.context);

		return (
			< BarStyleWrapper >
				<span className="sortTitle">{transl.sort}:</span>
				<span className="sortIcons" onClick={sortDates}>{transl[dateButton]}</span>
				<span className="sortIcons" onClick={sortAbc}>{abcButton}</span>
				<span className="langIcon" onClick={changeLang}>{this.context.lang}</span>
			</ BarStyleWrapper >
		)
	}
}

FilterBar.contextType = LanguageContext;
Header.contextType = LanguageContext;
