import React, {Component} from 'react';
import PropTypes from 'prop-types';
import firebase from "../../firebase";
import HomeView from "../HomeView/HomeView";
import ListView from "../ListView/ListView";

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            activePage: 'HomeView',
            users:[]
        };

    }

    componentDidMount = () => {
        // Bind to the item list and set up a callback for updates
        // TODO: See if this needs unbound on logout
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                if(items.hasOwnProperty(item)){
                    newState.push({
                        id: item,
                        date: items[item].date,
                        uid: items[item].uid,
                        item: items[item].item,
                        cost: items[item].cost
                    });
                }
            }
            this.setState({...this.state,
                items: newState
            });
        });

        // Get list of users
        const usersRef = firebase.database().ref('users');
        usersRef.on('value', (snapshot) => {
            let users = snapshot.val();
            this.setState(({...this.state, users}))
        });
    };

    // Adds a new entry to the expense list, pushing to Firebase
    doAddEntry = (date, expense, cost) => {

        const newItem = {
            date: Math.round(new Date().getTime()/1000),
            uid: this.props.user.uid,
            item: expense,
            cost: parseFloat(cost)
        };

        const itemsRef = firebase.database().ref('items');
        console.log("new item",newItem);
        console.log(this.props.user);
        itemsRef.push(newItem);
    };

    // Removes an item from the expense list, updating Firebase
    doRemoveEntry = (id) => {
        const itemRef = firebase.database().ref(`/items/${id}`);
        itemRef.remove(); // TODO: Then confirm success or fail with a popup? (.remove() returns a promise)
    };

    gotoListView = () => {
        this.setState({...this.state, activePage:'ListView'});
    };
    gotoHomeView = () => {
        this.setState({...this.state, activePage:'HomeView'});
    };

    render() {
        return (
            <div className="MainContent">
                { (this.props.user !== null && this.state.activePage === "HomeView") &&
                    <HomeView addEntry={this.doAddEntry} removeEntry={this.doRemoveEntry}
                              user={this.props.user} users={this.state.users} items={this.state.items} gotoListView={this.gotoListView}>
                        <button onClick={this.props.doLogout}>Logout</button>
                    </HomeView>}

                { (this.props.user !== null && this.state.activePage === "ListView") &&
                    <ListView addEntry={this.doAddEntry} removeEntry={this.doRemoveEntry}
                              user={this.props.user} users={this.state.users} items={this.state.items} gotoHomeView={this.gotoHomeView} />}
                {this.props.children}
            </div>
        );
    }
}

MainContent.propTypes = {
    doLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default MainContent;