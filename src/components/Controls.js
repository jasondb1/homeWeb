import React, { Component } from 'react';
import api from "../api";
import OnOff from "./OnOffButton";

class Controls extends Component {
    constructor(){
        super();

        this.state = {
            led_on: false,
        };
    };

    render(){

        return(
          <div>
              <h2>Controls</h2><br />
             <OnOff label='LED' />
          </div>
        );
    };



}

export default Controls;
