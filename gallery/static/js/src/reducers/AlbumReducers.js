import { FETCH_ALBUMS, FETCH_ALBUM } from '../constants';
import _ from 'lodash';

export default function(state={albums:{},album:{}},action){
  switch (action.type) {
    case FETCH_ALBUMS:
      return _.mapKeys(action.payload.data,'id');
      //return Object.assign({}, state, {'albums':_.mapKeys(action.payload.data,'id')})
    case FETCH_ALBUM:
      return Object.assign({}, state, {'album':action.payload.data})
    default:
      return state;

  }
}
