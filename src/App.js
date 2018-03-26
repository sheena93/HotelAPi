import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import SearchBar from 'material-ui-search-bar'
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
    this.state = {
      dataSource: [],
    };
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
  }

  handleUpdateInput(value){
    //debugger;
    this.fetchPlaces(value);
  };

  updateDataSource(placesDetails){
    this.setState({
      dataSource: placesDetails,
    });

  }

  fetchPlaces(query){
    // var map;
    // var service;
    // var infowindow;
    // var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
    //
    // // map = new google.maps.Map(document.getElementById('map'), {
    // //   center: pyrmont,
    // //   zoom: 15
    // // });
    //
    // var request = {
    // location: pyrmont,
    // radius: '500',
    // query: 'restaurant'
    // };
    //
    // // service = new google.maps.places.PlacesService();
    // service.textSearch(request, callback);
    //
    // function callback(results, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     console.log(results);
    //   }
    // }

  //     let config = {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //       }
  //     };
  //     let host = 'https://maps.googleapis.com/';
  //     let path =  "/maps/api/place/textsearch/" + GOOGLE_PLACES_OUTPUT_FORMAT ;
  //     // let querystring = "?query="+ query +"&key=" +GOOGLE_PLACES_API_KEY+"&sensor=false+&region=india&radius=100";
  //     let querystring = "?query="+ query +"&libraries=places&key=" +GOOGLE_PLACES_API_KEY+"&sensor=false+&region=india&radius=100";
  //     let url = host + path + querystring;
  //
  //     axios.get(url,config)
  //       .then((response)=>{
  //         console.info(response.data);
  //         let placesDetails = response.data.results.map((place)=>(place.formatted_address));
  //         this.updateDataSource(placesDetails);
  //       })
  //       .catch((error)=>{
  //         console.info(error);
  //       });
   }


  createPlacesList(placesDetails){
    this.placesList =  placesDetails.map((placesDetail,index)=>(<ListItem key={`key-${index}`} primaryText={placesDetail} leftIcon={<IconLocationOn />} />));
    return (
      <List>
        <Subheader key={`key-header`}>places</Subheader>
        {this.placesList}
      </List>);
  }

  render() {
    console.log("service",window.service);
    let placesList = <Subheader >No data</Subheader>
    if(this.state.dataSource.length){
      placesList = this.createPlacesList(this.state.dataSource);
    }
    return (
      <MuiThemeProvider>
        <div className="App">
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
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
