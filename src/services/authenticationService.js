import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handleResponse';

//import config from 'config';
//TODO: maybe move config to a seperate file
const config={
    apiUrl: 'http://localhost:3001/api',
};

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
console.log('login');
	const requestOptions = {
        method: 'POST',
        mode: 'no-cors', // no-cors, cors, *same-origin
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
