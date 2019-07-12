import React, { useContext } from 'react'
import classNames from 'classnames'

import { GlobalContext } from '../context/global'
import { ImagesContext } from '../context/images'

import { Flickr } from '../util/Flickr'

const SideBar = () => {
	const globalContext = useContext(GlobalContext)
	const imagesContext = useContext(ImagesContext)

	const sidebarIsOpen = globalContext.sidebarIsOpen

	const {
		photosets,
		header
	} = imagesContext

	const toggleSidebar = () => {
		globalContext.dispatch({
			type: 'TOGGLE_SIDEBAR'
		})
	}

	const getAllPhotos = () => {
		globalContext.dispatch({
			type: 'TOGGLE_VISIBILITY'
		})

		setTimeout(() => {
			Flickr.getPhotos().then(photos => {
				imagesContext.dispatch({
					type: 'SET_PHOTOS',
					photos: photos,
					header: 'All Photos'
				})
			})
		}, 20)
	}

	const filterPhotos = (photoset) => {
		globalContext.dispatch({
			type: 'TOGGLE_VISIBILITY'
		})

		setTimeout(() => {
			Flickr.filterPhotos(photoset.id).then(photos => {
				imagesContext.dispatch({
					type: 'SET_PHOTOS',
					photos: photos,
					header: photoset.title
				})
			})
		}, 20)
	}

	const photosetLinks = () => {
		return photosets.map(photoset => {
			return (
				<li className={header === photoset.title ? 'active' : ''} onClick={() => filterPhotos(photoset)} key={photoset.title}><span>{photoset.title} ({photoset.number})</span></li>
			)
		})
	}

	const sidebarClasses = classNames({
		'visible': sidebarIsOpen
	})

	return (
		<div className={sidebarClasses} id="sideBar" onMouseLeave={() => sidebarIsOpen && toggleSidebar()}>
			<h3><span>Filters</span></h3>
			<ul id="filters">
				<li className={header === 'All Photos' ? 'active' : ''} onClick={() => getAllPhotos()}><span>All Photos</span></li>
				{photosetLinks()}
			</ul>
		</div>
	)
}

export default SideBar
