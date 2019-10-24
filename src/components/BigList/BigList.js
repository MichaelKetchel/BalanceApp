import React from 'react';
import './BigList.css';

function format_date(date){
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}


class BigList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseName: '',
            cost: ''
        };
    }

    handleExpenseChange = (event) => {
        this.setState({...this.state,
            expenseName:event.target.value
        });
    };

    handleCostChange = (event) => {
        this.setState({...this.state,
            cost:event.target.value
        });
    };

    handleSubmit = (event, a, b) => {
        event.preventDefault();
        // Optionally allow to set date.
        this.props.addEntry(new Date(), this.state.expenseName, this.state.cost);
        console.log(event, a, b, event.target);
    };

    handleRemove = (id) => {
        this.props.removeEntry(id);
    };

    render() {
        return (
            <div className="BigList">
                I am the big List

                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>User</th>
                            <th>Expense</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map((item) =>
                        <tr key={item.id}>
                            <td>{format_date(new Date(item.date * 1000))}</td>
                            <td>{item.user}</td>
                            <td>{item.item}</td>
                            <td>${item.cost.toFixed(2)}</td>
                            <td>

                                {(this.props.user === item.user) ?
                                    <button onClick={this.handleRemove.bind(this, item.id)}>x</button>
                                    :''
                                }
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="controls">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Expense Name" value={this.state.expenseName} onChange={this.handleExpenseChange}/>
                        $<input type="text" placeholder="Cost" value={this.state.cost} onChange={this.handleCostChange}/>
                        <button type="submit">Submit!</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default BigList;



