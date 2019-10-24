import React from 'react';
import uuidv1 from 'uuid/v1';
// import logo from './logo.svg';
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
            user: 'michael'
        };
        console.log("Uuid:", uuidv1());
    }

    handleAddEntry = (date, expense, cost) => {
        let newList = [...this.state.data,
            {
                id: uuidv1(),
                date: date,
                user: this.state.user,
                item: expense,
                cost: parseFloat(cost)
            }];
        this.setState({...this.state, data:newList})
    };

    handleRemoveEntry = (id) => {
        console.log(id.toString(), this.state.data);

        const targetUser = this.state.data.filter(item => item.id === id)[0].user;
        if (this.state.user === targetUser){
            let newList = this.state.data.filter(item => item.id !== id);
            this.setState({...this.state, data:newList});
        }
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    The Pool
                </header>
                <div className="App-content">
                    <BigList data={this.state.data}
                             addEntry={this.handleAddEntry.bind(this)}
                             removeEntry={this.handleRemoveEntry.bind(this)}
                             user={this.state.user}
                    />
                    <BalanceSums
                        data={this.state.data}
                        />
                </div>
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
