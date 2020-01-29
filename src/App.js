import React,{ useState, useRef, useContext } from 'react';
import { Header } from './Header.js'
import { Body } from './Body.js'
import { Footer } from './Footer.js'
import { LanguageContext } from './LanguageContext.js'
import { MainStyleWrapper } from './styleWrappers.js';
import { useInputValue, useFetchData, useSortEvents } from './appHooks.js'
import { isItEnter } from './appServices.js'

const defaultData = {
	events: [],
	isError: false,
	isLoading: true
}

const defaultUserSort = {
	alpha: null,
	byDate: null
}

const defaultNewEvent = false;
const defaultInputValue = '';
const defaultLang = 'sk';

export const App = () => {

	const [ data, setData ] = useFetchData(defaultData)
	const [ newEventActive, setNewEventActive ] = useState(defaultNewEvent)
	const [ userSort, setResetSort, setSortClick ] = useSortEvents(defaultUserSort)
	const [ lang, setLang ] = useState(defaultLang);

	const [ newDate, setNewDate ] = useInputValue(defaultInputValue);
	const [ newTitle, setNewTitle ]  = useInputValue(defaultInputValue);
	const [ textQuery ] = useInputValue(defaultInputValue);

	const inputRef = useRef(null);
	const dict = useContext(LanguageContext);

	const disableNewEvent = () => setNewEventActive(defaultNewEvent)
	const addNewEvent = () => setNewEventActive(true)

	const removeNewEvent = () => {
		disableNewEvent()
		setNewDate(defaultInputValue)
		setNewTitle(defaultInputValue)
	}

	const comfirmNewEvent = (e) => {

		if (!isItEnter(e)) { return }

		if (!newTitle.value) {
			inputRef.current.focus()
			return
		}

		const newEvent = {
			title: newTitle.value,
			date: newDate.value || new Date()
		}

		setResetSort()
		removeNewEvent()
		setData({
			events: [newEvent].concat(data.events)
		})
	}
	const changeLang = () => setLang( lang === 'sk' ? 'en' : 'sk' )

	return (
		< MainStyleWrapper >
			< LanguageContext.Provider value={dict[lang]} >
		  		<Header
					disableNewEvent={disableNewEvent}
					sortEvents={setSortClick}
					changeLang={changeLang}
					textQuery={textQuery}
					order={userSort}
					/>
				<Body
					data={data}
					textQuery={textQuery}
					newTitle={newTitle}
					newDate={newDate}
					newEventActive={newEventActive}
					addNewEvent={addNewEvent}
					comfirmNewEvent={comfirmNewEvent}
					removeNewEvent={removeNewEvent}
					inputRef={inputRef}
					order={userSort}
					/>
				<Footer
					events={data.events}
					textQuery={textQuery.value}
					/>
			</ LanguageContext.Provider >
		</ MainStyleWrapper >
  )

}
