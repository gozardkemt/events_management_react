import React,{useContext} from 'react';
import { formatDate, sortEvents, filterEvents } from './appServices.js';
import { EventStyleWrapper, EventDateStyleWrapper } from './styleWrappers.js';
import { LanguageContext } from './LanguageContext.js';

export const EventList = ({ events, order, textQuery }) => {

	if (events.length === 0) { return null }

	const filtered = filterEvents( events, textQuery )
	const sorted = sortEvents( filtered, order.byDate, order.alpha)

	return sorted.map((e, i) => <Event key={i} title={e.title} date={e.date}/>)
}

const Event = ({title, date}) => (
	< EventStyleWrapper >
		< EventDate date={date} />
		< EventTitle title={title} />
	</ EventStyleWrapper >
)

const EventTitle = ({title}) => {

	return (
		<div>
			{title.split('-').map((name, i) => {

				const size = name.trim() === 'meetup' ? '0.9rem' : '1rem';
				const line = i === 0 ? 'underline' : 'normal';
				const style = {
					margin: 'unset',
					fontSize: size,
					textDecoration: line
				}
				return  <p key={i} style={style}>{name.trim()}</p>
			})}
		</div>

	)
}

const EventDate = (props) => {

	const dict = useContext(LanguageContext);

	const date = formatDate(props.date);
	const isToday = date === 'today',
	 	  isTomor = date === 'tomorrow',
		  isYestr = date === 'yesterday';

	return (
		< EventDateStyleWrapper >
			<small>{dict.eventDate}</small>
			<p style={{margin: 'unset'}}>
			{
				isToday || isTomor || isYestr ? dict[date] : date
			}
			</p>
		</ EventDateStyleWrapper >
	)

}
