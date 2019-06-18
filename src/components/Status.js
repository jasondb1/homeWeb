import React, { Component } from 'react';
import api from "../api";

class Status extends Component {
   constructor(){
        super();

        this.state = {
            status: [],
        };
    }

    componentDidMount() {
        //api.get().then(json => this.setState({ status: json }));
    }

    handleOnChange(){

    }

    render() {
        return(
            <div>Status</div>
        );
    }

}

export default Status;
