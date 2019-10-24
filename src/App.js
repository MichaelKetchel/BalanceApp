import React from 'react';
import firebase, { auth, provider } from './firebase.js';

// import logo from './logo.svg';
import './App.css';

import BigList from './components/BigList/BigList';
import BalanceSums from './components/BalanceSums/BalanceSums';



class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            user: null
        };

    }

    componentDidMount() {
        // Bind to the item list and set up a callback for updates
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                if(items.hasOwnProperty(item)){
                    newState.push({
                        id: item,
                        date: items[item].date,
                        user: items[item].user,
                        item: items[item].item,
                        cost: items[item].cost
                    });
                }
            }
            this.setState({...this.state,
                items: newState
            });
        });

        // Bind to auth state on Firebase to persist across refreshes and reloads
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });

    }


    // Adds a new entry to the expense list, pushing to Firebase
    handleAddEntry = (date, expense, cost) => {
        const newItem = {
            date: Math.round(new Date().getTime()/1000),
            user: this.state.user,
            item: expense,
            cost: parseFloat(cost)
        };

        const itemsRef = firebase.database().ref('items');
        itemsRef.push(newItem);
    };

    // Removes an item from the expense list, updating Firebase
    handleRemoveEntry = (id) => {
        const itemRef = firebase.database().ref(`/items/${id}`);
        itemRef.remove(); // TODO: Then confirm success or fail with a popup? (.remove() returns a promise)
    };


    // Handles logging out
    logout() {
        auth.signOut()
        .then(() => {
            this.setState({
                user: null
            });
        });
    }

    // Handles logging in
    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({...this.state,
                    user
                });
            });
    }



    render() {
        return (
            <div className="App">
                <header className="App-header">
                    The Pool

                    {this.state.user ?
                        <button onClick={this.logout.bind(this)}>Log Out</button>
                        :
                        <button onClick={this.login.bind(this)}>Log In</button>
                    }
                </header>

                { this.state.user ?
                    // Logged in
                    <div className="App-content">
                        <BigList data={this.state.items}
                                 addEntry={this.handleAddEntry.bind(this)}
                                 removeEntry={this.handleRemoveEntry.bind(this)}
                                 user={this.state.user}
                        />
                        <BalanceSums
                            data={this.state.items}
                        />
                    </div>


                    :
                    // Logged out
                    <div>
                        <p>Ya needa log in!</p>
                    </div>

                }

            </div>
        );
    }
}

export default App;

