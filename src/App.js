import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import axios from 'axios';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import SearchBar from 'material-ui-search-bar'
// set environment variables
export const GOOGLE_PLACES_API_KEY = "AIzaSyA7vMAOQL4WkTd_BRNZmJi7nkAumHj0wH8"
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

  handleUpdateInput = (value) => {
   this.fetchPlaces(value);
  };

  updateDataSource(placesDetails){
    this.setState({
      dataSource: placesDetails,
    });
  }

  fetchPlaces(query){
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

      axios.get(url,config)
        .then((response)=>{
          console.info(response.data);
          let placesDetails = response.data.results.map((place)=>(place.formatted_address));
          this.updateDataSource(placesDetails);
        })
        .catch((error)=>{
          console.info(error);
        });
   }

  componentWillMount(){
   this.fetchPlaces('pind');
  }

  render() {
    console.log(this.state.dataSource);
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title={<span style={styles.title}>Title</span>}
            onTitleClick={handleClick}
          />
          <p className="App-intro">To get started, search in the input field.</p>
           {/*  Creating the search Bar */}
           <div>
             <AutoComplete
               hintText="Search"
               dataSource={this.state.dataSource}
               onUpdateInput={this.handleUpdateInput}
             />
            {nearbyIcon}
            {/* <MobileTearSheet> */}
    <List>
      <ListItem primaryText={this.state.dataSource} leftIcon={<IconLocationOn />} />
      <ListItem primaryText="Starred" leftIcon={<IconLocationOn />} />
      <ListItem primaryText="Sent mail" leftIcon={<IconLocationOn />} />
      <ListItem primaryText="Drafts" leftIcon={<IconLocationOn />} />
      <ListItem primaryText="Inbox" leftIcon={<IconLocationOn />} />
    </List>

  {/* </MobileTearSheet> */}
           </div>
           <SearchBar
      onChange={this.handleUpdateInput}
      onRequestSearch={() => console.log('onRequestSearch')}
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    />
         </div>
       </MuiThemeProvider>
    );
  }
}

export default App;
