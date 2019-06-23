import React, { Component } from 'react';
import api from "../api";

const UPDATEINTERVAL = 5000;

//const ListItem = (props) => {
//	return(
//		<li>
//		{props.value}
//		</li>
//	);
//}

const ListItems = (props) => {
	console.log(props.values);
	//console.log(props.values.length());
	//if (props.values.length > 0){
	//	props.values.map( (value) => {
	//		return (<ListItem key={value} value={value} />);
	//	});
	//} else {
	//	console.log("return null");
	//	return null;
	//}

	return (
		<ul>
		<li key="Temperature">Temperature: {props.values.temperature}</li>
		<li key="Humidity">Humidity: {props.values.humidity}</li>
		<li key="Light">Light: {props.values.light}</li>
		</ul>
	)


}


class Status extends Component {
   constructor(){
        super();
        this.state = {
            status: [],
        };
	this.updateStatus = this.updateStatus.bind(this);
    }

    //TODO: do a setinterval to update every x seconds
    componentDidMount() {
       this.interval = setInterval(this.updateStatus, UPDATEINTERVAL);
        //api.getStatus().then(json => this.setState({ status: json }));
    };


	componentWillUnmount() {
		clearInterval(this.interval);
	}

    updateStatus() {
	    //console.log("updating status");
        api.getStatus().then(json => this.setState({ status: json }));
    }


    render() {
        return(
            <div>
                <h2>Status</h2>
		
			<ListItems values={this.state.status} />
		
            </div>
        );
    }

}

export default Status;
