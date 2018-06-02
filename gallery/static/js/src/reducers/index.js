import {combineReducers} from "redux";
import AlbumReducer from './AlbumReducers'


const rootReducer = combineReducers({
  albums:AlbumReducer
});

export default rootReducer;
