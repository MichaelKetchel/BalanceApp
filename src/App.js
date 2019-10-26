import React from 'react';
import { auth, provider } from './firebase.js';

import './App.scss';

import Login from "./components/Login/Login";
import MainContent from "./components/MainContent/MainContent";
import firebase from "./firebase";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    componentDidMount = () => {
        // Bind to auth state on Firebase to persist across refreshes and reloads
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.storeFirebaseUser(user);
                this.setState({ user: user.providerData[0] });
            }
        });
    };

    storeFirebaseUser = (user) => {
        const pdata = user.providerData[0];
        const usersRef = firebase.database().ref('users');
        usersRef.child(pdata.uid.toString()).set(pdata);
    };

    // Handles logging out
    doLogout = () => {
        auth.signOut()
        .then(() => {
            this.setState({
                user: null
            });
        });
    };

    // Handles logging in
    doLogin = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({...this.state,
                    user: user.providerData[0]
                });
                this.storeFirebaseUser(user);

            });
    };

    render() {
        return (
            <div className="App">

                { this.state.user ?
                    // Logged in
                    <MainContent doLogout={this.doLogout} user={this.state.user}>
                    </MainContent>
                    :
                    // Logged out
                    <Login onLogin={this.doLogin}/>
                }
            </div>
        );
    }
}

export default App;
