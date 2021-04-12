import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import {
	getPhotos,
	getPhotosets
} from './util/flickr'

import {
	Gallery,
	Header,
	Modal,
	SideBar
} from './components'

import './scss/globals.scss'

const FlickrGallery = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [photosets, setPhotosets] = useState([])
	const [photos, setPhotos] = useState([])
	const [header, setHeader] = useState('All Photos')
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
	const [modalData, setModalData] = useState({ isOpen: false, startingIndex: 0 })

	useEffect(() => {
		getPhotos().then((photos) => setPhotos(photos))
		getPhotosets().then((photosets) => setPhotosets(photosets))
	}, [])

	useEffect(() => {
		if (photos.length > 0) {
			setIsVisible(true)
		}
	}, [photos])

	return (
		<React.Fragment>
			<Header
				isVisible={isVisible}
				header={header}
				sidebarIsOpen={sidebarIsOpen}
				setSidebarIsOpen={setSidebarIsOpen} />
			{ Boolean(photosets.length > 0) &&
				<SideBar
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
					photos={photos}
					setModalData={setModalData} />
			}
			{ modalData.isOpen &&
				<Modal
					photos={photos}
					startingIndex={modalData.startingIndex}
					setModalData={setModalData} />
			}
		</React.Fragment>
	)
}

ReactDOM.render(<FlickrGallery />, document.getElementById('flickr-gallery'))
