import React from 'react';
import axios from 'axios';

import Navbar from './navbar';
import { Button, TextField, FormControl } from '@material-ui/core';
import { Container } from '@material-ui/core';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            gender: '',
            email: '',

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        let userDetails = {
            username: this.state.name,
            password: this.state.password,
            gender: this.state.gender,
            email: this.state.email,
        }
        axios.post(`http://nitin.com:5000/register`, userDetails)
            .then((response) => {
                console.log(response);
            })
            .then(
                this.setState({
                    username: '',
                    password: '',
                    gender: '',
                    email: ''
                })
            )
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Container maxWidth="lg">
                    <FormControl style={{ width: 500, marginLeft: 50, marginTop: 80 }}
                        noValidate autoComplete="off">
                        <h1 className="ml-3">Register to Use this Site</h1>
                        <TextField id="username-basic" label="username" name="username"
                            value={this.state.username} onChange={this.handleChange}
                            variant="outlined" style={{ margin: 10 }} />
                        <TextField id="password-basic" label="password" name="password"
                            value={this.state.password} onChange={this.handleChange}
                            variant="outlined" style={{ margin: 10 }} />
                        <TextField id="gender-basic" label="gender" name="gender"
                            value={this.state.gender} onChange={this.handleChange}
                            variant="outlined" style={{ margin: 10 }} />
                        <TextField id="email-basic" label="email" name="email"
                            value={this.state.email} onChange={this.handleChange}
                            variant="outlined" style={{ margin: 10 }} />
                        <Button variant="contained" color="primary" size="large"
                            style={{ margin: 10 }} onClick={this.handleClick}>Register</Button>
                    </FormControl>
                </Container>
            </React.Fragment>
        );
    }
}

export default Register;