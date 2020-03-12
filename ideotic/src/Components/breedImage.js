import React, { Component } from 'react';

class BreedImage extends Component {
    state = {
        breed: []
    }

    componentDidUpdate() {
        if(this.props.breedList !== this.state.breed) {
            this.setState({
                breed: this.props.breedList
            });
            this.fetchImage();
        }
    }

    fetchImage = async() => {
        const response = await fetch(`https://dog.ceo/api/breed/${this.props.breedList}/images/random`);
        const data = await response.json();
        const imageURL = data.message;
        this.setState({
            imageUrl: imageURL
        })
    }

    render() {
        return (
            
        )
    }
}

export default BreedImage;