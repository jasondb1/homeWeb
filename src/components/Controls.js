import React, { Component } from 'react';
import api from "../api";



class Controls extends Component {
    constructor(){
        super();

        this.state = {
            led_on: false,
        }

    }

    handleClick(){
console.log('[handle click]');
        if (this.state.led_on){
            api.ledOff().then(json => this.setState({led_on: false }));
        } else {
            api.ledOn().then(json => this.setState({led_on: true}));
        }
    }

    render(){

        return(
          <div>
              Controls<br />
              <button onClick={this.handleClick()}>Toggle LED</button>
          </div>
        );
    }



}

export default Controls;
