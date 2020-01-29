import { useState, useEffect } from 'react';

export const useInputValue = (defaulValue) => {

	const [ value, setValue ] = useState(defaulValue)

	return [
	{
		value,
		onChange: e => setValue(e.currentTarget.value)
	},
		setValue
	]
}

const dataPath = './data/events.json';

export const useFetchData = (defaultData) => {

	const [ data, setData ] = useState(defaultData)

	useEffect( () => {
		fetch(dataPath)
			.then( res => res.json())
			.then(
			res => { saveDataToState(res) },
			err => { errorWhileFetching(err) }
			)
	}, [])

	const saveDataToState = (res) => {
		setData({
			events: res,
			isLoading: false
			})
	}

	const errorWhileFetching = (err) => {
		console.error(err);
		setData({
			isLoading: false,
			isError: true
		})
	}

	return [ data, setData ]
}


export const useSortEvents = (defaultUserSort) => {

	const [ userSort, setUserSort ] = useState(defaultUserSort)

	const setSortClick = (e) => (
		e.currentTarget.id === 'alpha' ? sortAlpha() : sortbyDate()
	)

	const sortAlpha = () => {
		setUserSort({
			alpha: !userSort.alpha,
			byDate: null
		})
	}

	const sortbyDate = () => {
		setUserSort({
			byDate: !userSort.byDate,
			alpha: null
		})
	}

	const setResetSort = () => { setUserSort(defaultUserSort) }

	return [ userSort, setResetSort, setSortClick ]
}
