import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
	filterPhotos,
	getPhotos
} from '../../util/flickr'

import styles from './_styles.module.scss'

const Sidebar = ({
	setIsVisible,
	photosets,
	setPhotos,
	header,
	setHeader,
	sidebarIsOpen,
	setSidebarIsOpen
}) => {
	const getNewPhotos = (photoset) => {
		setIsVisible(false)

		setTimeout(() => {
			if (typeof photoset === 'string') {
				getPhotos()
					.then((photos) => {
						setHeader('All Photos')
						setPhotos(photos)
					})
			} else {
				filterPhotos(photoset.id)
					.then((photos) => {
						setHeader(photoset.title)
						setPhotos(photos)
					})
			}
		}, 500)
	}

	const photosetLinks = photosets.map((photoset) => {
		const classes = classNames({
			[styles['is-active']]: photoset.title === header
		})

		return (
			<li className={classes} onClick={() => getNewPhotos(photoset)} key={photoset.title}>
				<span>{photoset.title} ({photoset.number})</span>
			</li>
		)
	})

	const classes = classNames(styles.sideBar, {
		[styles['is-visible']]: sidebarIsOpen
	})

	const allPhotosLinkClasses = classNames({
		[styles['is-active']]: header === 'All Photos'
	})

	return (
		<div className={classes} onMouseLeave={() => sidebarIsOpen && setSidebarIsOpen(false)}>
			<h3 className={styles.header}><span>Filters</span></h3>
			<ul className={styles.filters}>
				<li className={allPhotosLinkClasses} onClick={() => getNewPhotos('all')}>
					<span>All Photos</span>
				</li>
				{photosetLinks}
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
