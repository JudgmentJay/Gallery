import React, { useRef } from 'react'
import PropTypes from 'prop-types'

const GalleryImage = ({
	photo,
	openSlideshow,
	imageNumber
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
		<div className="fade fadeOut" onClick={() => openSlideshow(imageNumber)} ref={image}>
			<img alt={title} onLoad={showImage} src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} />
			<span className="caption">{title}</span>
		</div>
	)
}

GalleryImage.propTypes = {
	photo: PropTypes.object.isRequired,
	openSlideshow: PropTypes.func.isRequired,
	imageNumber: PropTypes.number.isRequired
}

export default GalleryImage
