import React from 'react'
import ReactDOM from 'react-dom'

import { GlobalProvider } from './context/global'
import { ImagesProvider } from './context/images'

import Header from './components/Header'
import SideBar from './components/SideBar'
import Gallery from './components/Gallery'

import './css/main.scss'

require.context('./img', true, /\.(png|jpe?g|gif|svg)$/)

const FlickrGallery = () => {
	return (
		<GlobalProvider>
			<ImagesProvider>
				<Header	/>
				<SideBar />
				<Gallery />
			</ImagesProvider>
		</GlobalProvider>
	)
}

ReactDOM.render(<FlickrGallery />, document.getElementById('flickr-gallery'))
