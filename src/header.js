//import React, { Component } from 'react';
var React=require('react');

// class Header extends React.Component {
//   constructor(props){
//     super(props);
//   }
//   render(){
//     return (
//       <div>
//         Location App
//       </div>
//     );
//   }
// }
//
//
console.log(React);

var Header = React.createClass({
  // render: function() {
  //   return ('dkdk');
  // },
  handleClick: function () {
    alert('You clicked!')
  },
  render: function() {
    return <div onClick={this.handleClick}>Hello {this.props.name}</div>
  }
})

module.exports={
  Header:Header,
}
