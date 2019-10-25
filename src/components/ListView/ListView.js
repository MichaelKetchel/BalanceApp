import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BigList from "../BigList/BigList";
import BalanceSums from "../BalanceSums/BalanceSums";

class ListView extends Component {
    render() {
        return (
            <div>
                {/*{this.state.user ?*/}
                {/*    <button onClick={this.logout.bind(this)}>Log Out</button>*/}
                {/*    :*/}
                {/*    <button onClick={this.login.bind(this)}>Log In</button>*/}
                {/*}*/}

                <BigList data={this.props.items}
                         addEntry={this.addEntry}
                         removeEntry={this.removeEntry}
                         user={this.props.user}
                />
                <BalanceSums
                    data={this.props.items}
                />
            </div>
        );
    }
}

ListView.propTypes = {
    addEntry: PropTypes.func.isRequired,
    removeEntry: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired
};

export default ListView;