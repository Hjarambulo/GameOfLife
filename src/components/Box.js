import React, {Component} from 'react';

// component in charge of showing a single cell 
class Box extends Component{
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }
    render(){
        return(
            <div 
            className = {this.props.boxClass}
            id = {this.props.id}
            onClick = {this.selectBox}
            />
            
        );
    }
}

export default Box;