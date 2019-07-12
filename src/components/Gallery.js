import React, { useContext, useState, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import LazyLoad from 'react-lazyload'
import Lightbox from 'lightbox-react'
import 'lightbox-react/style.css'

import { GlobalContext } from '../context/global'
import { ImagesContext } from '../context/images'

import GalleryImage from './GalleryImage'

const Gallery = () => {
	const globalContext = useContext(GlobalContext)
	const imagesContext = useContext(ImagesContext)

	const isVisible = globalContext.isVisible

	const photos = imagesContext.photos

	const [slideshowIsOpen, setSlideshowisOpen] = useState(false)
	const [currentImage, setCurrentImage] = useState(0)

	useEffect(() => {
		globalContext.dispatch({
			type: 'TOGGLE_VISIBILITY'
		})
	}, [photos])

	const openSlideshow = (newCurrentImage) => {
		setCurrentImage(newCurrentImage)
		setSlideshowisOpen(true)
	}

	const closeSlideshow = () => {
		setSlideshowisOpen(false)
		setCurrentImage(0)
	}

	const currentPhotos = useMemo(() => photos.map((photo, index) => {
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
	}), [photos])

	const slideshowImages = useMemo(() => photos.map((photo) => ({
		src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.osecret}_o.jpg`,
		title: photo.title
	})), [photos])

	const galleryClasses = classNames({
		'fade': true,
		'fadeIn': isVisible,
		'fadeOut': !isVisible
	})

	return (
		<React.Fragment>
			<div className={galleryClasses} id="gallery">
				{currentPhotos}
			</div>
			{ slideshowIsOpen && (
				<Lightbox
					mainSrc={slideshowImages[currentImage].src}
					nextSrc={slideshowImages[(currentImage + 1) % slideshowImages.length].src}
					prevSrc={slideshowImages[(currentImage + slideshowImages.length - 1) % slideshowImages.length].src}
					onMoveNextRequest={() => setCurrentImage((currentImage + 1) % slideshowImages.length)}
					onMovePrevRequest={() => setCurrentImage((currentImage + slideshowImages.length - 1) % slideshowImages.length)}
					onCloseRequest={closeSlideshow}
					imageTitle={slideshowImages[currentImage].title} />
			)}
		</React.Fragment>
	)
}

export default Gallery
