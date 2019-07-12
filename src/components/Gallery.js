import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LazyLoad from 'react-lazyload'
import Lightbox from 'lightbox-react'
import 'lightbox-react/style.css'

import GalleryImage from './GalleryImage'

const Gallery = ({
	isVisible,
	photos
}) => {
	const [slideshowIsOpen, setSlideshowisOpen] = useState(false)
	const [currentImage, setCurrentImage] = useState(0)

	const openSlideshow = (newCurrentImage) => {
		setCurrentImage(newCurrentImage)
		setSlideshowisOpen(true)
	}

	const closeSlideshow = () => {
		setSlideshowisOpen(false)
		setCurrentImage(0)
	}

	const currentPhotos = photos.map((photo, index) => {
		return (
			<LazyLoad
				key={index}
				resize={true}>
				<GalleryImage
					key={photo.id}
					photo={photo}
					openSlideshow={openSlideshow}
					imageNumber={index} />
			</LazyLoad>
		)
	})

	const slideshowImages = photos.map((photo) => ({
		src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.osecret}_o.jpg`,
		title: photo.title
	}))

	const galleryClasses = classNames('fade', {
		'fadeIn': isVisible,
		'fadeOut': !isVisible
	})

	return (
		<React.Fragment>
			<div className={galleryClasses} id="gallery">
				{currentPhotos}
			</div>
			{ slideshowIsOpen &&
				<Lightbox
					mainSrc={slideshowImages[currentImage].src}
					nextSrc={slideshowImages[(currentImage + 1) % slideshowImages.length].src}
					prevSrc={slideshowImages[(currentImage + slideshowImages.length - 1) % slideshowImages.length].src}
					onMoveNextRequest={() => setCurrentImage((currentImage + 1) % slideshowImages.length)}
					onMovePrevRequest={() => setCurrentImage((currentImage + slideshowImages.length - 1) % slideshowImages.length)}
					onCloseRequest={closeSlideshow}
					imageTitle={slideshowImages[currentImage].title} />
			}
		</React.Fragment>
	)
}

Gallery.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	photos: PropTypes.array.isRequired
}

export default Gallery
