import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RouletteSelector from '../RouletteSelector';
import TournamentSelector from '../RouletteSelector';

class Controls extends Component{
    constructor(props){
        super(props);
        this.state = {
            populationSize: 20,
            generations: 10,
            poolSize: 5,
            mutationRate: 5,
            randomize: false,
            selector: 1,
        }
        this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
        this.handleRun = this.handleRun.bind(this);
    }

    handleChangeSpeed(e){
        //console.log(e.target.checked);
        this.props.handleSpeed();
    }

    handleRun(e){
        //async run(generations, populationSize, robotCreator, selectionF, mutationRate, randomize, poolSize){
        let selection = this.state.selector === 0 ? RouletteSelector : TournamentSelector;

        let runArgs = {
            generations: this.state.generations,
            populationSize: this.state.populationSize,
            randomize: this.state.randomize,
            selection: selection,
            mutationRate: this.state.mutationRate / 100,    //mutate rate must be decimal
            poolSize : this.state.poolSize,
        }
        this.props.handleRun(runArgs)
    }

    render(){
        //padding avoids window movement when over selection fields 
        //test comment
        //another test
        const style = {
            padding: "10px",

        };

        //my happy change
        const redundantConst = 10

        return (
            <div style={style}>
                <Grid container spacing={8} >
                    <Grid item xs={4}>
                        <TextField
                            id="standard-number"
                            label="Pop Size"
                            value={this.state.populationSize}
                            onChange={(e) => this.setState({populationSize: e.target.value})}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-number"
                            label="Generations"
                            value={this.state.generations}
                            onChange={(e) => this.setState({generations: e.target.value})}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-number"
                            label="Mutate Rate"
                            value={this.state.mutationRate}
                            onChange={(e) => this.setState({mutationRate: e.target.value})}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-number"
                            label="Pool Size"
                            value={this.state.poolSize}
                            onChange={(e) => this.setState({poolSize: e.target.value})}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel>Enemies</InputLabel>
                            <Select
                                value={this.state.randomize}
                                onChange={(e) => {this.setState({randomize: e.target.value})}}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value={true}>Random</MenuItem>
                                <MenuItem value={false}>Population</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel htmlFor="age-helper">Selection</InputLabel>
                            <Select
                                value= {this.state.selector}
                                onChange={(e) => {this.setState({selector: e.target.value})}}
                            >
                                <MenuItem value={0}>Roulette</MenuItem>
                                <MenuItem value={1}>Tournament</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.props.speed}
                                    onChange={this.handleChangeSpeed}
                                />
                            }
                            label="Fast"
                        />
                    </Grid>
                    <Grid item xs={4}>
                    <Button onClick={this.handleRun} variant="contained" color="primary" size="small">Run</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Controls;

