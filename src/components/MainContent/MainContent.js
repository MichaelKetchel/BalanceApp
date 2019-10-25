import React, {Component} from 'react';
import PropTypes from 'prop-types';
import firebase from "../../firebase";
import Home from "../Home/Home";
import ListView from "../ListView/ListView";

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            activePage: 'Home'
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
    };

    // Adds a new entry to the expense list, pushing to Firebase
    doAddEntry = (date, expense, cost) => {
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
    doRemoveEntry = (id) => {
        const itemRef = firebase.database().ref(`/items/${id}`);
        itemRef.remove(); // TODO: Then confirm success or fail with a popup? (.remove() returns a promise)
    };

    render() {
        return (
            <div className="MainContent">

                { (this.props.user !== null && this.state.activePage === "Home") &&
                    <Home addEntry={this.doAddEntry} removeEntry={this.doRemoveEntry}
                          user={this.props.user} items={this.state.items} />}

                { (this.props.user !== null && this.state.activePage === "ListView") &&
                    <ListView addEntry={this.doAddEntry} removeEntry={this.doRemoveEntry}
                              user={this.props.user} items={this.props.items} />}
            </div>
        );
    }
}

MainContent.propTypes = {
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default MainContent;