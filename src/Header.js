import React,{ useContext } from 'react';
import { LanguageContext } from './LanguageContext.js';
import PropTypes from 'prop-types';

export const Header = ({ disableNewEvent, sortEvents, order, changeLang, textQuery }) => {

	const dict = useContext(LanguageContext);

	return (
		<>
			<h1 className="title">{dict.events}</h1>
			< FilterBar
				disableNewEvent={disableNewEvent}
				sortEvents={sortEvents}
				order={order}
				changeLang={changeLang}
				textQuery={textQuery}
				/>
		</>
	)
}

const FilterBar = ({disableNewEvent, sortEvents, order, changeLang, textQuery}) => {

	const dict = useContext(LanguageContext);

	const dateButtonTitle = order.byDate ? 'newest' : 'oldest';
	const abcButtonTitle = order.alpha ? 'Xyz' : 'Abc';

	return (
		<div className="bar" onClick={disableNewEvent}>
			<span className="sortTitle">
				{dict.sort}:
			</span>
			<span className="sortIcons" id="byDate" onClick={sortEvents}>
				{dict[dateButtonTitle]}
			</span>
			<span className="sortIcons" id="alpha" onClick={sortEvents}>
				{abcButtonTitle}
			</span>
			<span className="sortTitle">
				{dict.filter}:
			</span>
			<input id="textQuery" {...textQuery} />
			<span className="langIcon" onClick={changeLang}>
				{dict.lang}
			</span>
		</div>
	)

}

Header.propTypes = {
	sortEvents: PropTypes.func.isRequired,
	order: PropTypes.object.isRequired,
	changeLang: PropTypes.func.isRequired,
	textQuery: PropTypes.object.isRequired
}
