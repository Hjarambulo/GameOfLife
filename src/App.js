import React, { Component } from 'react';

import Grid from './components/Grid'
import Buttons from './components/Buttons'
import Generation from './components/Generation';
import Title from './components/Title';
import Speed from './components/Speed';

class App extends Component{
    constructor(){
        super();
        this.speed = 300;
        this.rows = 10;
        this.cols = 20;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    // metod to select cells
    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy
        });
    }

    // metod to generate a random array of cells 
    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++){
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        });
    } 

    // metod to run the simulation
    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed); 
    }

    // metod to pause the simulation
    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    // metod to move to the next generation manually
    next = () =>{
        this.playButton();
        setTimeout(() => {
            clearInterval(this.intervalId);
        }, this.speed);
    }

    // metod to speed up the simulation
    fast = () => {
        this.speed -= 20;
        this.playButton();
    }

    // metod to slow down the simulation
    slow = () => {
        this.speed += 20;
        this.playButton();
    }

    // metod to clear up the simulation grid
    clear = () => {
        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0
        });
        this.pauseButton();
    }

    // metod to customize the size of the grid
    gridSize = (size) => {
        switch (size) {
            case '1':
                this.cols = 20;
                this.rows = 10;
            break;
            case '2':
                this.cols = 30;
                this.rows = 15;
            break; 
            default:
                this.cols = 40;
                this.rows = 20;    
        }
        this.clear();
    }

    // metod to run the logic of the states of the cells in the simulation
    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);

        // with the for cicle we itearte and evaluate the state of every cell
        // then we save the count of living neighbors to decide in the last step the state of the cell
        // in the next generation
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let count = 0; 

                // logic for inner cells
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;

                // logic for lateral border cells
                if (j === 0) if (g[i][this.cols - 1]) count++;
                if (j === 0 && i > 0 && i < this.rows -1) if (g[i - 1][this.cols - 1]) count++;
                if (j === 0 && i > 0 && i < this.rows -1) if (g[i + 1][this.cols - 1]) count++;
                if (j === this.cols -1) if (g[i][0]) count++;
                if (j === this.cols -1 && i > 0 && i < this.rows -1) if (g[i - 1][0]) count++;
                if (j === this.cols -1 && i > 0 && i < this.rows -1) if (g[i + 1][0]) count++;

                // logic for up and down border cells
                if (i === 0) if (g[this.rows - 1][j]) count++;
                if (i === 0 && j > 0 && j < this.cols - 1) if (g[this.rows - 1][j - 1]) count++;
                if (i === 0 && j > 0 && j < this.cols - 1) if (g[this.rows - 1][j + 1]) count++;
                if (i === this.rows -1) if (g[0][j]) count++;
                if (i === this.rows -1 && j > 0 && j < this.cols - 1) if (g[0][j - 1]) count++;
                if (i === this.rows -1 && j > 0 && j < this.cols - 1) if (g[0][j + 1]) count++;
                
                // logic for edge cells
                if (i === 0 && j === 0) if (g[this.rows - 1][this.cols - 1]) count++;
                if (i === 0 && j === 0) if (g[this.rows - 1][j + 1]) count++;
                if (i === 0 && j === 0) if (g[i + 1][this.cols - 1]) count++;
                if (i === 0 && j === this.cols - 1) if (g[this.rows - 1][0]) count++;
                if (i === 0 && j === this.cols - 1) if (g[i + 1][0]) count++;
                if (i === 0 && j === this.cols - 1) if (g[this.rows - 1][j - 1]) count++;
                if (i === this.rows - 1 && j === this.cols - 1) if (g[0][0]) count++;
                if (i === this.rows - 1 && j === this.cols - 1) if (g[0][j - 1]) count++;
                if (i === this.rows - 1 && j === this.cols - 1) if (g[i - 1][0]) count++;
                if (i === this.rows - 1 && j === 0) if (g[0][this.cols - 1]) count++;
                if (i === this.rows - 1 && j === 0) if (g[0][j + 1]) count++;
                if (i === this.rows - 1 && j === 0) if (g[i - 1][this.cols - 1]) count++;
                
                // logic to decide the state of the cell in the next generation
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                if (!g[i][j] && count === 3) g2[i][j] = true;
            }
        }
        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
        });
    }

    render(){

        return(
            <div>
                <Title/>

                <Buttons
                playButton = {this.playButton}
                pauseButton = {this.pauseButton}
                next = {this.next}
                clear = {this.clear}
                seed = {this.seed}
                gridSize = {this.gridSize}
                /> 

                <Grid
                    gridFull = {this.state.gridFull}
                    rows = {this.rows}
                    cols = {this.cols}
                    selectBox = {this.selectBox}
                />

                <Generation
                generation = {this.state.generation}
                />

                <Speed
                speed = {this.speed}
                slow = {this.slow}
                fast = {this.fast}
                />
            </div>
        );
    }
}

function arrayClone (arr) {
    return JSON.parse(JSON.stringify(arr));
}

export default App;