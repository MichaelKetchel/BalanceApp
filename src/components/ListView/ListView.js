import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ListView.scss';
import BigList from "../BigList/BigList";
import BalanceSums from "../BalanceSums/BalanceSums";

class ListView extends Component {
    render() {
        return (
            <div className="ListView">
                <BigList data={this.props.items}
                         addEntry={this.props.addEntry}
                         removeEntry={this.props.removeEntry}
                         user={this.props.user}
                         users={this.props.users}
                />
                <BalanceSums
                    data={this.props.items}
                />
                <div className="ButtonBar">
                    <button className="Home" onClick={this.props.gotoHomeView}>Home</button>
                </div>
            </div>
        );
    }
}

ListView.propTypes = {
    addEntry: PropTypes.func.isRequired,
    removeEntry: PropTypes.func.isRequired,
    gotoHomeView: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired
};

export default ListView;