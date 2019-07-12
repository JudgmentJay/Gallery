import React, { useReducer } from 'react'

const GlobalContext = React.createContext()

const GlobalProvider = (props) => {
	const initialState = {
		sidebarIsOpen: false,
		isVisible: true
	}

	const [globalStatus, dispatch] = useReducer(globalReducer, initialState)

	const providedItems = {
		sidebarIsOpen: globalStatus.sidebarIsOpen,
		isVisible: globalStatus.isVisible,
		dispatch: dispatch
	}

	return <GlobalContext.Provider value={providedItems}>{props.children}</GlobalContext.Provider>
}

const globalReducer = (state, action) => {
	switch (action.type) {
		case 'TOGGLE_SIDEBAR':
			return {...state, sidebarIsOpen: !state.sidebarIsOpen}
		case 'TOGGLE_VISIBILITY':
			return {...state, isVisible: !state.isVisible}
		default:
			return state
	}
}

export {
	GlobalContext,
	GlobalProvider
}
