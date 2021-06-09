import React, { Component } from 'react';

class Generation extends Component{
    
    render() {

        return(
            <h2>Generation: {this.props.generation}</h2>
        );
    }
}

export default Generation;