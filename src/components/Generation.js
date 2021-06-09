import React, { Component } from 'react';

// this component shows how many generations have passed
class Generation extends Component{
    
    render() {

        return(
            <h2>Generation: {this.props.generation}</h2>
        );
    }
}

export default Generation;