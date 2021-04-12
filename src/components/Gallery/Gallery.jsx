import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LazyLoad from 'react-lazyload'

import { GalleryImage } from '../../components'

import 'lightbox-react/style.css'
import styles from './_styles.module.scss'

const Gallery = ({
	isVisible,
	photos,
	setModalData
}) => {
	const currentPhotos = photos.map((photo, i) => {
		return (
			<LazyLoad
				resize={true}
				once={true}
				classNamePrefix="gallery"
				key={`lazyload-${i}`}>
				<GalleryImage
					photo={photo}
					imageNumber={i}
					setModalData={setModalData}
					key={photo.id} />
			</LazyLoad>
		)
	})

	const galleryClasses = classNames(`${styles.gallery} fade`, {
		'fadeIn': isVisible,
		'fadeOut': !isVisible
	})

	return (
		<React.Fragment>
			<div className={galleryClasses}>
				{currentPhotos}
			</div>
		</React.Fragment>
	)
}

Gallery.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	photos: PropTypes.array.isRequired,
	setModalData: PropTypes.func.isRequired
}

export default Gallery
