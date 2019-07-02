import React, {Component} from "react";
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Router, Route, Link } from 'react-router-dom';
import "./App.css";

import { history } from "./helpers/history";
import { authenticationService} from "./services/authenticationService";

import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './LoginPage/LoginPage';
import { HomePage } from './HomePage/HomePage';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <h1>HomeWeb</h1>
                <div className="header-bar"/>
                <Router history={history}>
                    <div>
                        {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                        }

                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <Route path="/login" component={LoginPage} />
                                    </div>
                                </div>
                            </div>

                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
