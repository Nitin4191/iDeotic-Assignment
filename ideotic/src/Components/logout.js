import React from 'react';

import { Link } from 'react-router-dom';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        window.localStorage.removeItem("token");
        
    }

    render() {
        return (
            <React.Fragment>
                <h1>You are Logged out!</h1>
                <Link to="/">Back to Login</Link>
            </React.Fragment>
        );
    }
}

export default Logout;