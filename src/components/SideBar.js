import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Flickr } from '../util/Flickr'

const Sidebar = ({
	setIsVisible,
	photosets,
	setPhotos,
	header,
	setHeader,
	sidebarIsOpen,
	setSidebarIsOpen
}) => {
	const getPhotos = (photoset) => {
		setIsVisible(false)

		setTimeout(() => {
			if (typeof photoset === 'string') {
				Flickr.getPhotos().then(photos => {
					setHeader('All Photos')
					setPhotos(photos)
				})
			} else {
				Flickr.filterPhotos(photoset.id).then(photos => {
					setHeader(photoset.title)
					setPhotos(photos)
				})
			}
		}, 500)
	}

	const photosetLinks = () => {
		return photosets.map(photoset => {
			return (
				<li className={photoset.title === header ? 'active' : ''} onClick={() => getPhotos(photoset)} key={photoset.title}><span>{photoset.title} ({photoset.number})</span></li>
			)
		})
	}

	const sidebarClasses = classNames({
		'visible': sidebarIsOpen
	})

	return (
		<div className={sidebarClasses} id="sideBar" onMouseLeave={() => sidebarIsOpen && setSidebarIsOpen(false)}>
			<h3><span>Filters</span></h3>
			<ul id="filters">
				<li className={header === 'All Photos' ? 'active' : ''} onClick={() => getPhotos('all')}><span>All Photos</span></li>
				{photosetLinks()}
			</ul>
		</div>
	)
}

Sidebar.propTypes = {
	setIsVisible: PropTypes.func.isRequired,
	photosets: PropTypes.array.isRequired,
	setPhotos: PropTypes.func.isRequired,
	header: PropTypes.string.isRequired,
	setHeader: PropTypes.func.isRequired,
	sidebarIsOpen: PropTypes.bool.isRequired,
	setSidebarIsOpen: PropTypes.func.isRequired
}

export default Sidebar
