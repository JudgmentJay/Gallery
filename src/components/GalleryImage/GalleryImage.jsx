import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import styles from './_styles.module.scss'

const GalleryImage = ({
	photo,
	imageNumber,
	setModalData
}) => {
	const image = useRef(null)

	const showImage = () => {
		image.current.classList.remove('fadeOut')
		image.current.classList.add('fadeIn')
	}

	const {
		id,
		secret,
		server,
		farm,
		title
	} = photo

	return (
		<div className={`${styles.imageContainer} fade fadeOut`} onClick={() => setModalData({ isOpen: true, startingIndex: imageNumber})} ref={image}>
			<img alt={title} onLoad={showImage} src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} className={styles.image} />
			<span className={styles.caption}>{title}</span>
		</div>
	)
}

GalleryImage.propTypes = {
	photo: PropTypes.object.isRequired,
	imageNumber: PropTypes.number.isRequired,
	setModalData: PropTypes.func.isRequired
}

export default GalleryImage
