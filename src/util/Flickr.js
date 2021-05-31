const axios = require('axios')

const baseUrl = 'https://api.flickr.com/services/rest'
const userId = '156592040%40N05'
const apiKey = '59f786b10e08594cc3b7afc024649f20'
const credentials = `api_key=${apiKey}&user_id=${userId}`
const format = 'format=json&nojsoncallback=1'

exports.getPhotosets = () => {
	return axios.get(`${baseUrl}/?method=flickr.photosets.getList&${credentials}&${format}`)
		.then((response) => {
			return response.data.photosets.photoset.map((photoset) => {
				return {
					id: photoset.id,
					number: photoset.photos,
					title: photoset.title._content
				}
			})
		})
		.catch((error) => {
			console.error(`Error fetching photosets: ${error}`)

			return []
		})
}

exports.getPhotos = () => {
	return axios.get(`${baseUrl}/?method=flickr.people.getPhotos&${credentials}&extras=original_format&${format}`)
		.then((response) => {
			return response.data.photos.photo.map((photo) => {
				return {
					id: photo.id,
					secret: photo.secret,
					server: photo.server,
					farm: photo.farm,
					title: photo.title,
					osecret: photo.originalsecret
				}
			})
		})
		.catch((error) => {
			console.error(`Error fetching photos: ${error}`)

			return []
		})
}

exports.filterPhotos = (photoset) => {
	return axios.get(`${baseUrl}/?method=flickr.photosets.getPhotos&${credentials}&photoset_id=${photoset}&extras=original_format&${format}`)
		.then((response) => {
			return response.data.photoset.photo.map((photo) => {
				return {
					id: photo.id,
					secret: photo.secret,
					server: photo.server,
					farm: photo.farm,
					title: photo.title,
					osecret: photo.originalsecret
				}
			})
		})
		.catch((error) => {
			console.error(`Error filtering photos: ${error}`)

			return []
		})
}
