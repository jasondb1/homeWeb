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
       setInterval(this.updateStatus(), 5000);
        //api.getStatus().then(json => this.setState({ status: json }));
    };

    updateStatus() {
        api.getStatus().then(json => this.setState({ status: json }));
    }

   function ListItem(props) {
       return(
         <li>
             {props.value}
         </li>
       );
    };



   const DisplayList = () =>  {

        const ListItems = this.state.status.map( (value) => {
                return (<ListItem key={value} value={value} />);
            }

        );

        console.log(this.state);
    this.state.status.map( (value) => { console.log(value); });

        return(
            <ul>
                <ListItems />
            </ul>
        );
    };


    render() {
        return(
            <div>
                <h2>Status</h2>
                <DisplayList />
            </div>
        );
    }

}

export default Status;
