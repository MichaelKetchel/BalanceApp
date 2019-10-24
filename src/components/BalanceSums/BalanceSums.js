import React from 'react';
import './BalanceSums.css';

const BalanceSums = (props) => {
    const {data} = props;
    let bSums = {};
    let total = 0;
    let perPerson = 0;

    // Aggregate Costs
    for (let rownum in data){
        if(data.hasOwnProperty(rownum)){
            let row = data[rownum];
            // Initialize if unseen.
            if (!(row.user in bSums))
                bSums[row.user] = 0;
            bSums[row.user] += row.cost;
        }
    }

    // Get total
    for (let user in bSums){
        if (bSums.hasOwnProperty(user)){
            total += bSums[user];
        }
    }
    perPerson = total/Object.keys(bSums).length;

    // console.log(bSums)
    console.log (perPerson);
    return (
        <div className="BalanceSums">
            <div>Total: {total}</div>
            <div>Per Person: {perPerson}</div>

            {Object.keys(bSums).map( k =>
                <div>User: {k} Total: {bSums[k]} Diff: {bSums[k] - perPerson} </div>
            )}

        </div>
    );
};

export default BalanceSums;



