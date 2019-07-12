import React, { useReducer, useEffect } from 'react'

import { Flickr } from '../util/Flickr'

const ImagesContext = React.createContext()

const ImagesProvider = (props) => {
	const initialState = {
		photosets: [],
		photos: [],
		header: 'All Photos'
	}

	const [photoData, dispatch] = useReducer(imagesReducer, initialState)

	useEffect(() => {
		Flickr.getPhotos().then(photos => {
			Flickr.getPhotosets().then(photosets => {
				dispatch({
					type: 'INITIAL_SETUP',
					photosets: photosets,
					photos: photos
				})
			})
		})
	}, [])

	const providedItems = {
		photosets: photoData.photosets,
		photos: photoData.photos,
		header: photoData.header,
		dispatch: dispatch
	}

	return <ImagesContext.Provider value={providedItems}>{props.children}</ImagesContext.Provider>
}

const imagesReducer = (state, action) => {
	switch (action.type) {
		case 'INITIAL_SETUP':
			return {...state, photosets: action.photosets, photos: action.photos}
		case 'SET_PHOTOS':
			return {...state, photos: action.photos, header: action.header}
		default:
			return state
	}
}

export {
	ImagesContext,
	ImagesProvider
}
