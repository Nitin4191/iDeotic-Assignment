import React, { Component } from 'react';
import Navbar from './navbar';
import { Redirect } from 'react-router-dom';
import "./dog.css";


class Listbreed extends Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem("token");
        let status = true;
        if (token == null) {
            status = false;
        }

        this.state = {
            breedList: [],
            selectedBreed: [],
            imageUrl: require('../Resources/bike.jpg'),
            status
        }
    }

    componentDidMount() {
        fetch(`https://dog.ceo/api/breeds/list/all`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                this.setState({
                    breedList: Object.keys(data.message)
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        fetch(`https://dog.ceo/api/breed/${this.state.selectedBreed}/images/random`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    imageUrl: data.message,
                })
            })
    }

    render() {
        if (this.state.status === false) {
            return (
                <Redirect to="/" />
            );
        }
        // console.log(this.state.selectedBreed);
        return (
            <React.Fragment>
                <Navbar />
                <h1 style={{ textAlign: "center" }}>List of All the Dogs</h1>
                <div className="selectDiv">
                    <select className="custom-select" id="SelectDog" name="selectedBreed" value={this.state.selectedBreed} onChange={this.handleChange}>
                        <option defaultValue>Choose...</option>
                        {this.state.breedList.map((breed, index) => {
                            return (
                                <option value={breed} key={index}>{breed}</option>
                            );
                        })}
                    </select>
                    <button className="btn btn-info mt-2" onClick={this.handleClick}>Show</button>
                </div>
                <div className="image-container">
                    <img className="image-dog" alt="dog" src={this.state.imageUrl} />
                </div>
            </React.Fragment>
        )
    }
}

export default Listbreed;