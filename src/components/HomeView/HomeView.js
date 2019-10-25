import React from 'react';
import PropTypes from 'prop-types';
import './HomeView.scss';

const Home = (props) => {
    const diff=5.00;
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
                        <div className={'TotalText ' + (diff > 0 ? 'Ahead' : 'Behind')} >${diff.toFixed(2)}</div>
                        <div>
                            { diff > 0 ? "Ahead" : "Behind" }
                        </div>
                    </div>
                }

            </div>

            <div className="BarGraph">
                I'm gonna be a pretty bar graph
            </div>

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