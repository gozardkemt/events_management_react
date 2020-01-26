import React from 'react';
import { BarStyleWrapper } from './styleWrappers';
import { LanguageContext } from './LanguageContext.js';
import PropTypes from 'prop-types';

export default class Header extends React.Component {

	render() {

		const {
			sortAbc,
			sortDates,
			order,
			changeLang,
			handleTyping,
			textQuery
		} = this.props;

		return (
			<>
				<h1 className="title">{this.context.events}</h1>
				< FilterBar
					sortAbc={sortAbc}
					sortDates={sortDates}
					order={order}
					changeLang={changeLang}
					textQuery={textQuery}
					handleTyping={handleTyping}
					/>
			</>
		)
	}
}

class FilterBar extends React.Component {
	render() {

		const { sortAbc, sortDates, order, changeLang, textQuery, handleTyping } = this.props;

		const dateButton = order.date ? 'newest' : 'oldest';
		const abcButton = order.abc ? 'Xyz' : 'Abc';
		const transl = this.context;

		return (
			< BarStyleWrapper >
				<span className="sortTitle">{transl.sort}:</span>
				<span className="sortIcons" onClick={sortDates}>{transl[dateButton]}</span>
				<span className="sortIcons" onClick={sortAbc}>{abcButton}</span>
				<span className="sortTitle">{transl.filter}:</span>
				<input id="textQuery" onChange={handleTyping} value={textQuery} />
				<span className="langIcon" onClick={changeLang}>{transl.lang}</span>
			</ BarStyleWrapper >
		)
	}
}

FilterBar.contextType = LanguageContext;
Header.contextType = LanguageContext;

Header.propTypes = {
	sortAbc: PropTypes.func.isRequired,
	sortDates: PropTypes.func.isRequired,
	changeLang: PropTypes.func.isRequired,
	order: PropTypes.objectOf(PropTypes.bool),
}
