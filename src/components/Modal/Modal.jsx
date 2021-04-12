import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'lightbox-react'

const Modal = ({
	photos,
	startingIndex,
	setModalData
}) => {
	const [currentIndex, setCurrentIndex] = useState(startingIndex)

	const getSlideshowImages = () => photos.map((photo) => ({
		src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.osecret}_o.jpg`,
		title: photo.title
	}))

	const slideshowImages = useMemo(getSlideshowImages, [photos])

	return (
		<Lightbox
			mainSrc={slideshowImages[currentIndex].src}
			nextSrc={slideshowImages[(currentIndex + 1) % slideshowImages.length].src}
			prevSrc={slideshowImages[(currentIndex + slideshowImages.length - 1) % slideshowImages.length].src}
			onMoveNextRequest={() => setCurrentIndex((currentIndex + 1) % slideshowImages.length)}
			onMovePrevRequest={() => setCurrentIndex((currentIndex + slideshowImages.length - 1) % slideshowImages.length)}
			onCloseRequest={() => setModalData({ isOpen: false, startingIndex: 0 })}
			imageTitle={slideshowImages[currentIndex].title} />
	)
}

Modal.propTypes = {
	photos: PropTypes.array.isRequired,
	startingIndex: PropTypes.number.isRequired,
	setModalData: PropTypes.func.isRequired
}

export default Modal
