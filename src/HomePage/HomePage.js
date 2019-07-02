import React from 'react';
//import { Link } from 'react-router-dom';

import { userService } from '../services/userService';
import { authenticationService } from "../services/authenticationService";
import Controls from "../components/Controls";
import Status from "../components/Status";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    )}
                </ul>
                }
                <Controls/>
                <Status/>
            </div>

        );
    }

}

export { HomePage };
