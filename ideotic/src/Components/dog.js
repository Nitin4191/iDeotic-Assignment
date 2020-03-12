import React from 'react';
import "./dog.css";

const Dog = (props) => {
    return (
        <div className="child">
            <img style={{ width: 300, height: 300, margin: 10 }} src={props.url} alt="..." />
        </div>
    );
}

export default Dog;