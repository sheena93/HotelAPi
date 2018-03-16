import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,    
  }}>
    {text}
  </div>
);


class SimpleMap extends React.Component {


  render() {
    return (
       <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyBrwMt6rrqiyusjn0yDCUE3F2vLY4Tx_zw'}}
        center={this.props.center}
        zoom={this.props.zoom}
      >
        <AnyReactComponent 
          lat={this.props.center.lat} 
          lng={this.props.center.lng} 
          text={'current location'} 
        />

      </GoogleMapReact>
    );
  }
}

export default SimpleMap;
