import React from 'react';
import Header from './Header.js'
import Body from './Body.js'
import Footer from './Footer.js'
import { isItEnter } from './appServices.js'
import { MainStyleWrapper } from './styleWrappers.js';

const dataPath = './data/events.json';

const defaultNewEventState = {
	newEventActive: false,
	newTitle: '',
	newDate: ''
}

const defaultSortingState = {
	sortedAlphabeticaly: null,
	sortedDateAscending: null
}

const defaultDataHandlingState = {
	events: [],
	isError: false,
	isLoading: true
}

const defaultState = {
	...defaultDataHandlingState,
	...defaultSortingState,
	...defaultNewEventState
}

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.inputRef = React.createRef();
		this.state = defaultState
	}

	// handle data import
	componentDidMount() {
		fetch(dataPath)
			.then( res => res.json())
			.then(
			res => { this.saveDataToState(res)},
			err => { this.errorWhileFetching(err) }
			)
	}

	saveDataToState = (res) => {
		this.setState({
			events: res,
			isLoading: true
			})
	}

	errorWhileFetching = (err) => {
		console.error(err);
		this.setState({
			isLoading: false,
			isError: true
		})
	}

	// handle sorting
	sortAlphabeticaly = () => {
		this.setState({
			...defaultSortingState,
			sortedAlphabeticaly: !this.state.sortedAlphabeticaly
		})
	}

	sortDateAscending = () => {
		this.setState({
			...defaultSortingState,
			sortedDateAscending: !this.state.sortedDateAscending,
		})
	}

	// handle adding new event
	addNewEvent = () => { this.setState({ newEventActive: true })}
	removeNewEvent = () => { this.setState({ ...defaultNewEventState})}

	comfirmNewEvent = (e) => {

		if (!isItEnter(e)) { return }

		const newEvent = {
			title: this.state.newTitle || 'Prázdny záznam',
			date: this.state.newDate || new Date()
		}
		this.setState({
			...defaultState,
			isLoading: false,
			events: [newEvent].concat(this.state.events),
		})
	}

	handleInputTyping = e => {

		const input = e.currentTarget;
		const type = input.type === 'text' ? 'newTitle' : 'newDate';
		this.setState({ [type]: input.value })
	}

	render() {

		const {
			events,
			sortedDateAscending:sortedDate,
			sortedAlphabeticaly:sortedAbc,
			newEventActive,
			newDate,
			newTitle,
			isLoading,
			isError
		} = this.state;

		const {
			sortAlphabeticaly,
			sortDateAscending,
			addNewEvent,
			handleInputTyping,
			comfirmNewEvent,
			removeNewEvent,
			inputRef
		} = this;

		return (
			< MainStyleWrapper >
		  		<Header
					sortAbc={sortAlphabeticaly}
					sortDates={sortDateAscending}
					order={{
						abc:sortedAbc,
						date: sortedDate
					}}
					/>
				<Body
					isLoading={isLoading}
					isError={isError}
					events={events}
					handleTyping={handleInputTyping}
					newEventActive={newEventActive}
					addNewEvent={addNewEvent}
					newTitle={newTitle}
					newDate={newDate}
					comfirmNewEvent={comfirmNewEvent}
					removeNewEvent={removeNewEvent}
					inputRef={inputRef}
					order={{
						abc: sortedAbc,
						date: sortedDate
					}}
					/>
				<Footer
					events={events}
					/>
			< /MainStyleWrapper >
	  )
	}
}
