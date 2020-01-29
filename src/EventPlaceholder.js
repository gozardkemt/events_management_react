import React,{useContext, useEffect} from 'react';
import { LanguageContext } from './LanguageContext.js';

export const EventPlaceholder = ({ addNewEvent, newEventActive, newDate, newTitle, comfirmNewEvent, removeNewEvent, inputRef }) => {

	  if ( !newEventActive ) {
		  return < AddNewEvent addNewEvent={addNewEvent} />
	  }

	  return  ( < EventInput
		  			newTitle={newTitle}
					newDate={newDate}
					inputRef={inputRef}
					comfirmNewEvent={comfirmNewEvent}
					removeNewEvent={removeNewEvent}
					/>
			)
}

const AddNewEvent = ({addNewEvent}) => {

	const dict = useContext(LanguageContext);

	return (
		<article className="addEvent" onClick={addNewEvent}>
		  	<span style={{margin:'auto'}}>{dict.addNewEvent}</span>
		</article>
	)
}

const EventInput = ({newTitle, newDate, inputRef, removeNewEvent, comfirmNewEvent}) => {

	useEffect( () => {
		document.addEventListener('keyup', comfirmNewEvent)
		return ( () => {
			document.removeEventListener('keyup', comfirmNewEvent)
		})
}, [comfirmNewEvent])

	useEffect( () => { inputRef.current.focus() }, [inputRef])

	const dict = useContext(LanguageContext);

	return (
		<article className="article" >
			<input className="input" id="newDate" placeholder="dd-mm-yyyy" maxLength="10" type="date" {...newDate} />
			<input className="input" id="newTitle" ref={inputRef} type="text" {...newTitle} />
			<div className="eventButtons">
				<span onClick={comfirmNewEvent}>{dict.add}</span>
				<span onClick={removeNewEvent}>{dict.cancel}</span>
			</div>
		</article>
	)
}
