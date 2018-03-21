import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { call , put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
export const GOOGLE_PLACES_API_KEY = "AIzaSyCp3fWNRJXJxq0gJnj_t_vvGsffF11nsJ0"
export const GOOGLE_PLACES_OUTPUT_FORMAT = "json"

// actions
export const searchPlaces = query => ({
  type: 'ACTIVATE_PLACE_SEARCH',
  query,
});

export const placesDetails = (placesDetails) => ({
  type: 'PLACES_DETAILS_SUCEESS',
  placesDetails,
});

export const errorInRequest = (error) => ({
  type: 'PLACES_DETAILS_FAILED',
  error,
});

// reducers
export const searchReducers = (state = {isLoading:false,isFailed:false,placesDetails:undefined}, action) => {
  const newState = Object.assign({},state);
  switch (action.type) {
    case 'ACTIVATE_PLACE_SEARCH':
      return newState;
    case 'PLACES_DETAILS_SUCEESS':
      return newState;
    case 'PLACES_DETAILS_FAILED':
      return newState;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  searchReducers,
});

// sagas
export function* fetchPlacesDetails(action) {
  try{
    const response = yield call(fetchPlaces,action.places);
    yield put(placesDetails(response));
  }catch(error){
    yield put(errorInRequest(error));
  }
}

export function* fetchPlacesDetailsSaga() {
  yield takeLatest('ACTIVATE_PLACE_SEARCH', fetchPlacesDetails)
}
// service Call
export function fetchPlaces(query){
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    };
    let host = 'https://maps.googleapis.com/';
    let path =  "/maps/api/place/textsearch/" + GOOGLE_PLACES_OUTPUT_FORMAT ;
    // let querystring = "?query="+ query +"&key=" +GOOGLE_PLACES_API_KEY+"&sensor=false+&region=india&radius=100";
    let querystring = "?query="+ query +"&libraries=places&key=" +GOOGLE_PLACES_API_KEY+"&sensor=false+&region=india&radius=100";
    let url = host + path + querystring;

    return axios.get(url,config)
      .then((response)=>{
        console.info(response.data);
        return response.data.results.map((place)=>(place.formatted_address));
      });
 }


// store
export const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(fetchPlacesDetailsSaga)
