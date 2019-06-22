import React, { Component } from 'react';
import api from "../api";

class Status extends Component {
   constructor(){
        super();

        this.state = {
            status: [],
        };
    }

    //TODO: do a setinterval to update every x seconds
    componentDidMount() {
        api.getStatus().then(json => this.setState({ status: json }));
    };

    // handleOnChange(){
    //
    // };

   listItem(props) {
       return(
         <li>
             props.value
         </li>
       );
    };



   displayList() {

        //TODO: make this to read keys, maybe a for loop
        const listItems = this.state.status.map( (value) => {
                return (<listItem key={value} value={value} />);
            }

        );

        console.log(listItems);

        return(
            <ul>
                <listItems />
            </ul>
        );
    };


    render() {
        return(
            <div>
                <h2>Status</h2>
                <displayList />
            </div>
        );
    }

}

export default Status;
