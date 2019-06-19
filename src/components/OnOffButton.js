import React, {Component} from 'react';
import '../api';
import api from "../api";


class OnOff extends Component {

    constructor(props) {
        super(props);

        this.state = {
            label: props.label,
            isOn: props.isOn,

        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.led_on) {
            api.ledOff().then(json => this.setState({led_on: false}));
        } else {
            api.ledOn().then(json => this.setState({led_on: true}));
        }
    };

    btnState() {
        return (
            'btn ' +
            this.state.led_on ? 'btn-success' : 'btn-danger'
        )
    }

    render() {
        return (
            <div className='control'>
                <button
                    onClick={this.handleClick}
                    className={this.btnState()}
                >
                    {this.state.isOn ? 'ON' : 'OFF'}
                </button>
            </div>
        );
    }
}

export default OnOff;
