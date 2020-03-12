import React from 'react';
import axios from 'axios';

import Navbar from './navbar';
import { Link, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

class Login extends React.Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('token');
        let status = true;
        if (token == null) {
            status = false;
        }
        this.state = {
            email: '',
            password: '',
            result: '',
            status
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        axios.post(`http://nitin.com:5000/login`, {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                // console.log(response.data.token);
                window.localStorage.setItem('token', response.data.token)
                this.setState({
                    result: response.data,
                    status: true
                })
            })
            .then(
                this.setState({
                    email: '',
                    password: ''
                })
            )
    }

    render() {
        if (this.state.status) {
            return <Redirect to='/home' />
        }
        return (
            <React.Fragment>
                <Navbar />

                <Container maxWidth="lg" style={{ marginTop: 80, width: 600 }}>
                    <div className="loginColor">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="Email"
                                name="email" value={this.state.email} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="Password"
                                name="password" value={this.state.password} onChange={this.handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleClick}>
                            Submit
                        </button>
                        
                        <div className="mt-2">New User? <Link to="/register">Sign In!</Link></div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

export default Login;