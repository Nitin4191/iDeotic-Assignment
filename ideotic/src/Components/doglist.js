import React from 'react';
import Dog from './dog';

const Doglist = (props) => {

    const dogsArray = props.dogs.map((dogurl) => {
        return (
            <Dog url={dogurl}/>
        );
    })

    return (
        <div className="dogPicture">
            {dogsArray}
        </div>
    );
}

export default Doglist;