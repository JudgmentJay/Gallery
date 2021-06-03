const axios = require('axios')

exports.getPhotosets = () => {
	return axios.get('/flickr/photosets')
		.then((response) => response.data)
		.catch((error) => {
			console.error(error.response.data)

			return []
		})
}

exports.getPhotos = () => {
	return axios.get('/flickr/photos')
		.then((response) => response.data)
		.catch((error) => {
			console.error(error.response.data)

			return []
		})
}

exports.filterPhotos = (photoset) => {
	return axios.get(`/flickr/filterPhotos/${photoset}`)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error.response.data)

			return []
		})
}
