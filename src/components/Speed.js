import React, { Component } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';

// this component shows the refresh time and buttons to control it, slow to slow the refresh time 
// and fast to make it faster

class Speed extends Component{

    render(){

        return(
            <div>
                <h3>Refresh Time: {this.props.speed} ms</h3>
                <ButtonToolbar className = 'center'>
                    <Button variant='secondary' onClick={this.props.slow}>{' '}
                        Slow
                    </Button>
                    <Button variant='secondary' onClick={this.props.fast}>{' '}
                        Fast
                    </Button>
                </ButtonToolbar>
        </div>
        );
    }
}

export default Speed;