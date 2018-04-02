import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import axios from 'axios';
import { List, ListItem } from 'material-ui/List';
import SearchBar from 'material-ui-search-bar';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import {
  activateGeod,
  closeGeod,
} from './redux';
// set environment variables
export const GOOGLE_PLACES_API_KEY = "AIzaSyCp3fWNRJXJxq0gJnj_t_vvGsffF11nsJ0"
export const GOOGLE_PLACES_OUTPUT_FORMAT = "json"


const nearbyIcon = <IconLocationOn />;

function handleClick() {
  alert('Welcome to Fab Hotels');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};




class App extends Component {

  constructor(props){
    super(props);
    this.fetchPlaces= this.fetchPlaces.bind(this);
    this.updateState= this.updateState.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state={
      placesRequestSucess:false,
      placeResults:[],
      hotelsRequestSucess:false,
      hotelsResults:[],
    };
  }

  updateState(newState){
    this.setState(newState);
  }


  fetchPlaces(query) {
    var pyrmont = new window.google.maps.LatLng(-33.8665433,151.1956316);
    var mapDiv = document.getElementById('map');
    var map = new window.google.maps.Map(mapDiv, {
      center: pyrmont,
      zoom: 15
    });

    var request ={
      query,
    }
    var  updateState = this.updateState;
    function handleTextSearchResponse(placeResults, placesServiceStatus) {
      if (placesServiceStatus == window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(placeResults)
        placeResults=placeResults.slice(0,5);
        updateState({placesRequestSucess:true,placeResults:placeResults});
      }
      else {
        console.error(placesServiceStatus);
        updateState({placesRequestSucess:false,placeResults:["please try again eg 'taj mahal"]});
      }
    }

    var placesSearch = new window.google.maps.places.PlacesService(map);
    placesSearch.textSearch(request, handleTextSearchResponse);

  }


  fetchHotels(query) {
    // dummy map
    var pyrmont = new window.google.maps.LatLng(-33.8665433,151.1956316);
    var mapDiv = document.getElementById('map');
    var map = new window.google.maps.Map(mapDiv, {
      center: pyrmont,
      zoom: 15
    });

    var request = {
      query:query,
      type: ['lodging','restaurant','bar','cafe']
    };

    var  updateState = this.updateState;

    function handleTextSearchResponse(hotelsResults, hotelsServiceStatus) {
      if (hotelsServiceStatus == window.google.maps.places.PlacesServiceStatus.OK) {
        hotelsResults=hotelsResults.slice(0,5);
        updateState({hotelsRequestSucess:true,hotelsResults:hotelsResults});
      }
      else {
        console.error(hotelsServiceStatus);
        updateState({hotelsRequestSucess:true,hotelsResults:[]});
      }
    }

    var hotelsSearch = new window.google.maps.places.PlacesService(map);
    hotelsSearch.textSearch(request, handleTextSearchResponse);

  }

  createPlacesList(header,formatedName,placesDetails){
    if(formatedName){
      this.placesList =  placesDetails.map((placesDetail,index)=>(<ListItem key={`key-${index}`} primaryText={placesDetail.formatted_address} leftIcon={<IconLocationOn />} />));
    }
    else{
      console.log('hotels',placesDetails);

      var isHotelType = (type)=>{
        return type == 'lodging' || type == 'restaurant' || type == 'cafe' || type == 'bar' ;
      }
      placesDetails = placesDetails.filter((place)=>{
        if(place.types.some(isHotelType)){
          return place;
        };
      });
      console.log('hotels2',placesDetails);

      this.placesList =  placesDetails.map((placesDetail,index)=>(<ListItem key={`key-${index}`} primaryText={placesDetail.name} leftIcon={<IconLocationOn />} />));
    }
    return (
      <List>
        <Subheader key={`key-${header}`}>{header}</Subheader>
        {this.placesList}
      </List>);
  }

  handleUpdateInput(value){
    if(value){
      this.fetchPlaces(value);
      this.fetchHotels(value);
    }
  };

  render() {
    let placesList = <Subheader>No data</Subheader>
    if(this.state.placesRequestSucess){
      placesList = this.createPlacesList('Places',true,this.state.placeResults);
    }
    let hotelsList = true;
    if(this.state.hotelsRequestSucess){
      console.log('hotel list');

      hotelsList = this.createPlacesList('Hotels',false,this.state.hotelsResults);
    }

    return (
      <MuiThemeProvider>
        <div className="App">
          <div id={'map'} ref={this.map} ></div>

          {/* <button type="button" onClick={()=>this.fetchPlaces('punjabi dhaba in bnagalore')}>Click place!</button>
          <button type="button" onClick={()=>this.fetchHotels('punjabi dhaba in bnagalore')}>Click hotel!</button> */}
          {/* <input   onChange={(query)=>this.fetchPlaces(query)}></input> */}
          <AppBar
            title={<span style={styles.title}>Fab Hotels</span>}
            onTitleClick={handleClick}
          />
          <IconLocationOn/>

           {/*  Creating the search Bar */}
          <SearchBar
            onChange={(value)=>(this.handleUpdateInput(value))}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              margin: '0 auto',
              maxWidth: 800
            }}
          />
          {placesList}
          {hotelsList}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
 
