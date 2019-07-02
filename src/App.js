import React, {Component} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./App.css";
import { LoginPage } from './LoginPage/LoginPage';
import { HomePage } from './HomePage/HomePage';
import { PrivateRoute } from './components/PrivateRoute';

class App extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>HomeWeb</h1>
                <div className="header-bar"/>
                <Router>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
