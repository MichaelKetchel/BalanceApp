import React from 'react';
import uuidv1 from 'uuid/v1';
// import logo from './logo.svg';

import firebase, { auth, provider } from './firebase.js';

import './App.css';
import BigList from './components/BigList/BigList';
import BalanceSums from './components/BalanceSums/BalanceSums';

const dummydate = new Date();
const testData = [
    {id: uuidv1(), date: new Date(dummydate - 9 * (24*60*60*1000) ), user: 'michael', item: 'pizza', cost: 5.25},
    {id: uuidv1(), date: new Date(dummydate - 8 * (24*60*60*1000) ), user: 'michael', item: 'bagel', cost: 2.25},
    {id: uuidv1(), date: new Date(dummydate - 7 * (24*60*60*1000) ), user: 'michael', item: 'dinner', cost: 8.0},
    {id: uuidv1(), date: new Date(dummydate - 6 * (24*60*60*1000) ), user: 'cj', item: 'ice cream', cost: 6.00},
    {id: uuidv1(), date: new Date(dummydate - 5 * (24*60*60*1000) ), user: 'cj', item: 'pizza', cost: 6.00},
    {id: uuidv1(), date: new Date(dummydate - 4 * (24*60*60*1000) ), user: 'cj', item: 'spaghetti', cost: 8.00},
    {id: uuidv1(), date: new Date(dummydate - 3 * (24*60*60*1000) ), user: 'cj', item: 'yer mom', cost: 8.00},
    {id: uuidv1(), date: new Date(dummydate - 4 * (24*60*60*1000) ), user: 'Bob', item: 'spaghetti', cost: 8.00},
    {id: uuidv1(), date: new Date(dummydate - 3 * (24*60*60*1000) ), user: 'Bob', item: 'yer mom', cost: 8.00}
];







class App extends React.Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            data: [...testData],
            items: [],
            user: null
        };
        console.log("Uuid:", uuidv1());
    }

    componentDidMount() {
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

        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });

    }



    handleAddEntry = (date, expense, cost) => {

        const newItem = {
            id: uuidv1(),
            date: Math.round(new Date().getTime()/1000),
            user: this.state.user,
            item: expense,
            cost: parseFloat(cost)
        };

        const itemsRef = firebase.database().ref('items');
        itemsRef.push(newItem);

        // this.setState({...this.state, data:newList})
    };

    handleRemoveEntry = (id) => {
        // console.log(id.toString(), this.state.data);
        //
        // const targetUser = this.state.data.filter(item => item.id === id)[0].user;
        // if (this.state.user === targetUser){
        //     let newList = this.state.data.filter(item => item.id !== id);
        //     this.setState({...this.state, data:newList});
        // }

        const itemRef = firebase.database().ref(`/items/${id}`);
        itemRef.remove(); // Then confirm success or fail
    };


    logout() {
        auth.signOut()
        .then(() => {
            this.setState({
                user: null
            });
        });
    }
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
        console.log("Data", this.state.data);
        console.log("Items", this.state.items);
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
                    <p>
                        <p>Ya needa log in!</p>
                    </p>

                }

            </div>
        );
    }
}

export default App;



//
// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.js</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Learn React
//                 </a>
//             </header>
//         </div>
//     );
// }
