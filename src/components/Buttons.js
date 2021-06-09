import React, { Component } from 'react';
import {ButtonToolbar, Button, DropdownButton, Dropdown} from 'react-bootstrap';

class Buttons extends Component{

    handleSelect = (evt) => {
        this.props.gridSize(evt);
    }

    render() {

        return(
            <div className='center'>
                <ButtonToolbar>
                    <Button variant='success' onClick={this.props.playButton}>{' '}
                        Play
                    </Button>
                    <Button variant='danger' onClick={this.props.pauseButton}>{' '}
                        Pause
                    </Button>
                    <Button variant='secondary' onClick={this.props.clear}>{' '}
                        Clear
                    </Button>
                    <Button variant='secondary' onClick={this.props.seed}>{' '}
                        Seed
                    </Button>
                    <DropdownButton
                        title='Grid Size'
                        variant='secondary'
                        id='size-menu'
                        onSelect={this.handleSelect}
                    >
                        <Dropdown.Item eventKey='1'>10x20</Dropdown.Item>
                        <Dropdown.Item eventKey='2'>15x30</Dropdown.Item>
                        <Dropdown.Item eventKey='3'>20x40</Dropdown.Item>
                    </DropdownButton>
                </ButtonToolbar>
            </div>     
        );
    }
}

export default Buttons;