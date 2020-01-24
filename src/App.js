import React from 'react';
import Header from './Header.js'
import Body from './Body.js'
import Footer from './Footer.js'
import { MainStyleWrapper } from './styleWrappers.js';

const localhostDataUrl = 'http://localhost:8080/events.json';

const defaultState = {
	events: [],
	isError: false,
	isLoading: true,
	sortedAlphabeticaly: null,
	sortedDateAscending: null,
	newTitle: '',
	newDate: ''
}

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = defaultState
	}

	componentDidMount() {
		fetch(localhostDataUrl)
			.then( res => res.json())
			.then(
			res => { this.saveDataToState(res) },
			err => { this.errorWhileFetching(err) }
			)
	}

	saveDataToState = (res) => {
		this.setState({
			events: res,
			isLoading: false
			})
	}

	errorWhileFetching = (err) => {
		console.error(err);
		this.setState({
			isLoading: false,
			isError: true
		})
	}

	sortAlphabeticaly = () => {
		const bool = this.state.sortedAlphabeticaly;
		this.setState({
			sortedAlphabeticaly: !bool,
			sortedDateAscending: null
		})
	}

	sortDateAscending = () => {
		const bool = this.state.sortedDateAscending;
		this.setState({
			sortedDateAscending: !bool,
			sortedAlphabeticaly: null
		})
	}

	addNewEvent = () => {
		const newEvent = {
			title: this.state.newTitle,
			date: this.state.newDate
		}
		this.setState({
			events: [newEvent].concat(this.state.events)
		})
	}

	render() {

		const {
			events,
			sortedDateAscending:sortedDate,
			sortedAlphabeticaly:sortedAbc,
		} = this.state;

		const {
			sortAlphabeticaly,
			sortDateAscending,
			addNewEvent,
		} = this;

		return (
			< MainStyleWrapper >
		  		<Header
					sortAbc={sortAlphabeticaly}
					sortDates={sortDateAscending}
					/>
				<Body
					events={events}
					orderAbc={sortedAbc}
					orderDate={sortedDate}
					addNewEvent={addNewEvent}
					/>
				<Footer />
			< /MainStyleWrapper >
	  )
	}
}
