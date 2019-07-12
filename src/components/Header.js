import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Header = ({
	isVisible,
	header,
	sidebarIsOpen,
	setSidebarIsOpen
}) => {
	const headerClasses = classNames('fade', {
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
			<button className={buttonClasses} id="toggleSideBar" onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>Menu</button>
		</header>
	)
}

Header.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	header: PropTypes.string.isRequired,
	sidebarIsOpen: PropTypes.bool.isRequired,
	setSidebarIsOpen: PropTypes.func.isRequired
}

export default Header
