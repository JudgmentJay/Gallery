import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Flickr } from './util/Flickr'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Gallery from './components/Gallery'

import './css/main.scss'

const FlickrGallery = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [photosets, setPhotosets] = useState([])
	const [photos, setPhotos] = useState([])
	const [header, setHeader] = useState('All Photos')
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

	useEffect(() => {
		Flickr.getPhotos().then(photos => {
			Flickr.getPhotosets().then(photosets => {
				setPhotosets(photosets)
				setPhotos(photos)
			})
		})
	}, [])

	useEffect(() => {
		setIsVisible(true)
	}, [photos])

	return (
		<React.Fragment>
			<Header
				isVisible={isVisible}
				header={header}
				sidebarIsOpen={sidebarIsOpen}
				setSidebarIsOpen={setSidebarIsOpen} />
			{ Boolean(photosets.length > 0) &&
				<Sidebar
					setIsVisible={setIsVisible}
					photosets={photosets}
					setPhotos={setPhotos}
					header={header}
					setHeader={setHeader}
					sidebarIsOpen={sidebarIsOpen}
					setSidebarIsOpen={setSidebarIsOpen} />
			}
			{ Boolean(photos.length > 0) &&
				<Gallery
					isVisible={isVisible}
					photos={photos} />
			}
		</React.Fragment>
	)
}

ReactDOM.render(<FlickrGallery />, document.getElementById('flickr-gallery'))
