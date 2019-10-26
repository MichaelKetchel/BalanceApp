import React from 'react';
import PropTypes from 'prop-types';
import './HomeView.scss';

const Home = (props) => {

    const {items, user} = props;

    let bSums = {};
    let total = 0;

    // Aggregate Costs
    for (let rownum in items){
        if(items.hasOwnProperty(rownum)){
            let row = items[rownum];
            // Initialize if unseen.
            if (!(row.uid in bSums))
                bSums[row.uid] = 0;
            bSums[row.uid] += row.cost;
        }
    }

    // Get total
    for (let uid in bSums){
        if (bSums.hasOwnProperty(uid)){
            total += bSums[uid];
        }
    }
    const perPerson = total/Object.keys(bSums).length;

    const diff= bSums[user.uid] - perPerson;
    return (
        <div className="HomeView">


            <div className="GroupSelection">
                <div>You are viewing</div>
                <select>
                    <option value="test1">test1</option>
                    <option value="test2">test2</option>
                </select>
                <br/>
                (Select box and choose group from drop-down)
            </div>

            <div className="FriendlySummary">
                <span>Currently, you are</span>

                { diff === 0.0 ?
                    <div className="Even">In Balance!</div>
                    :
                    <div className="Uneven">
                        <div className={'TotalText ' + (diff > 0 ? 'Ahead' : 'Behind')} >${Math.abs(diff).toFixed(2)}</div>
                        <div>
                            { diff > 0 ? "Ahead" : "Behind" }
                        </div>
                    </div>
                }

            </div>

            <div className="BarGraph">
                I'm gonna be a pretty bar graph
            </div>
            {props.children}
            <div className="ButtonBar">
                <button className="Settings">Gear</button>
                <button className="More" onClick={props.gotoListView}>Ellipses</button>
            </div>
        </div>
    );

};

Home.propTypes = {
    user: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    gotoListView: PropTypes.func.isRequired
};

export default Home;