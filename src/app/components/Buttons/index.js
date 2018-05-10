import React, { Component } from 'react';


class RestaurantButton extends Component {

	constructor(props) {
        super(props);
    }


	  render() {
	    return (
	      <a href={ this.props.link }>{ this.props.text }</a>
	    )
	  }
}

export default RestaurantButton;
