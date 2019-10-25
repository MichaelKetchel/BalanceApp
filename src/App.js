import React from 'react';
import { auth, provider } from './firebase.js';

import './App.scss';

import Login from "./components/Login/Login";
import MainContent from "./components/MainContent/MainContent";


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
                this.setState({ user });
            }
        });
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
                    user
                });
            });
    };

    render() {
        return (
            <div className="App">

                { this.state.user ?
                    // Logged in
                    <MainContent onLogout={this.doLogout} user={this.state.user}/>
                    :
                    // Logged out
                    <Login onLogin={this.doLogin}/>
                }
            </div>
        );
    }
}

export default App;
