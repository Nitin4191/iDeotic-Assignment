import React, { Component } from 'react';
import Navbar from './navbar';
import Doglist from './doglist';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem("token");
        let status = true;
        if(token == null) {
            status = false;
        }
        this.state = {
            picture: [],
            status
        }
    }

    componentDidMount() {
        fetch(`https://dog.ceo/api/breeds/image/random/15`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.setState({ picture: data.message})
        })
    }

    render() {
        if(this.state.status === false) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <React.Fragment>
            <Navbar />
                <h1 style={{textAlign: 'center'}}>Who Let the Dogs Out!</h1>
                <Doglist dogs={this.state.picture}/>
            </React.Fragment>
        )
    }
}

export default Home;