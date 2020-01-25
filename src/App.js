import React from 'react';
import Header from './Header.js'
import Body from './Body.js'
import Footer from './Footer.js'
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

	componentDidMount() {
		fetch(dataPath)
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

	addNewEvent = () => { this.setState({ newEventActive: true })}

	removeNewEvent = () => {

		const article = this.inputRef.current.parentNode;
		article.classList.toggle('SlideOut');

		this.setState({ ...defaultNewEventState})
	}

	comfirmNewEvent = (e) => {

		const inputText = this.inputRef.current;
		const inputDate = inputText.previousSibling;

		if (e.type === 'click')
		{
			if (e.target.contains(inputText)) { return }
			if (e.target.contains(inputDate)) { return }
		}

		if (e.type === 'keyup')
		{
			if (e.keyCode !== 13) { return }
		}

		const newEvent = {
			title: this.state.newTitle || 'Nový záznam',
			date: this.state.newDate || new Date()
		}
		this.setState({
			...defaultState,
			isLoading: false,
			events: [newEvent].concat(this.state.events),
		})
	}

	handleTyping = e => {

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
			newTitle
		} = this.state;

		const {
			sortAlphabeticaly,
			sortDateAscending,
			addNewEvent,
			handleTyping,
			comfirmNewEvent,
			removeNewEvent,
			inputRef
		} = this;

		return (
			< MainStyleWrapper >
		  		<Header
					sortAbc={sortAlphabeticaly}
					sortDates={sortDateAscending}
					order={{abc:sortedAbc,date: sortedDate}}
					/>
				<Body
					handleTyping={handleTyping}
					events={events}
					order={{abc:sortedAbc,date: sortedDate}}
					newEventActive={newEventActive}
					addNewEvent={addNewEvent}
					newTitle={newTitle}
					newDate={newDate}
					comfirmNewEvent={comfirmNewEvent}
					removeNewEvent={removeNewEvent}
					inputRef={inputRef}
					/>
				<Footer />
			< /MainStyleWrapper >
	  )
	}
}
