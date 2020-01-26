import React from 'react';
import Header from './Header.js'
import Body from './Body.js'
import Footer from './Footer.js'
import { isItEnter } from './appServices.js'
import { LanguageContext, dict } from './LanguageContext.js'
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

const defaultOtherState = {
	lang: 'sk'
}

const defaultState = {
	...defaultDataHandlingState,
	...defaultSortingState,
	...defaultNewEventState,
	...defaultOtherState
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
			res => { this.saveDataToState(res)},
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
			...defaultNewEventState,
			...defaultSortingState,
			sortedAlphabeticaly: !this.state.sortedAlphabeticaly
		})
	}

	sortDateAscending = () => {
		this.setState({
			...defaultNewEventState,
			...defaultSortingState,
			sortedDateAscending: !this.state.sortedDateAscending,
		})
	}

	addNewEvent = () => { this.setState({ newEventActive: true })}
	removeNewEvent = () => { this.setState({ ...defaultNewEventState})}

	comfirmNewEvent = (e) => {

		if (!isItEnter(e)) { return }

		if (!this.state.newTitle) {
			this.inputRef.current.focus()
			return
		}

		const newEvent = {
			title: this.state.newTitle,
			date: this.state.newDate || new Date()
		}
		this.setState({
			...defaultState,
			isLoading: false,
			lang: this.state.lang,
			events: [newEvent].concat(this.state.events),
		})
	}

	handleInputTyping = e => {
		const input = e.currentTarget;
		this.setState({ [input.id]: input.value })
	}

	changeLang = () => {
		this.setState({
			lang: this.state.lang === 'sk' ? 'en' : 'sk'
		})
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
			isError,
			lang
		} = this.state;

		const {
			sortAlphabeticaly,
			sortDateAscending,
			addNewEvent,
			handleInputTyping,
			comfirmNewEvent,
			removeNewEvent,
			inputRef,
			changeLang
		} = this;

		return (
			< MainStyleWrapper >
				< LanguageContext.Provider value={dict[lang]} >
			  		<Header
						sortAbc={sortAlphabeticaly}
						sortDates={sortDateAscending}
						changeLang={changeLang}
						order={{
							abc: sortedAbc,
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
				</ LanguageContext.Provider >
			</ MainStyleWrapper >
	  )
	}
}
