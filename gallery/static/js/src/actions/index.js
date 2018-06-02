import axios from 'axios';
import { FETCH_ALBUMS, FETCH_ALBUM } from '../constants';

export  function fetchAlbums(){
	const request = axios.get('/api/photos/albums/');
	return {
		type: FETCH_ALBUMS,
		payload: request
	}
}

export  function fetchAlbum(slug){
	const request = axios.get('/api/photos/albums/'+slug);
	return {
		type: FETCH_ALBUM,
		payload: request
	}
}
