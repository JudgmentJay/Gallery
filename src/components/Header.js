import React, { useContext } from 'react'
import classNames from 'classnames'

import { ImagesContext } from '../context/images'
import { GlobalContext } from '../context/global'

const Header = () => {
	const globalContext = useContext(GlobalContext)
	const imagesContext = useContext(ImagesContext)

	const {
		sidebarIsOpen,
		isVisible
	} = globalContext

	const header = imagesContext.header

	const toggleSidebar = () => {
		globalContext.dispatch({
			type: 'TOGGLE_SIDEBAR'
		})
	}

	const headerClasses = classNames({
		'fade': true,
		'fadeIn': isVisible,
		'fadeOut': !isVisible
	})

	const buttonClasses = classNames({
		'active': sidebarIsOpen,
		'inactive': !sidebarIsOpen
	})

	return (
		<header>
			<h1>Flickr Image Gallery</h1>
			<h2 className={headerClasses}>{header}</h2>
			<button className={buttonClasses} id="toggleSideBar" onClick={() => toggleSidebar()}>Menu</button>
		</header>
	)
}

export default Header
