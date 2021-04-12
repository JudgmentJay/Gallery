import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './_styles.module.scss'

const Header = ({
	isVisible,
	header,
	sidebarIsOpen,
	setSidebarIsOpen
}) => {
	const subHeaderClasses = classNames(`${styles.subHeader} fade`, {
		'fadeIn': isVisible,
		'fadeOut': !isVisible
	})

	const buttonClasses = classNames(styles.toggleSideBar, {
		[styles['is-active']]: sidebarIsOpen
	})

	return (
		<header className={styles.headerBar}>
			<h1 className={styles.header}>Flickr Image Gallery</h1>
			<h2 className={subHeaderClasses}>{header}</h2>
			<button className={buttonClasses} onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>Menu</button>
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
