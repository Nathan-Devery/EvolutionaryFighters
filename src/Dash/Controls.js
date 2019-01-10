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

class Controls extends Component{
    constructor(props){
        super(props);
        this.state = {
            populationSize: 20,
            generations: 10,
            mutationRate: 5,
            speed: 60}

        this.handleChangePop = this.handleChangePop.bind(this);
        this.handleChangeGen = this.handleChangeGen.bind(this);
        this.handleChangeMut = this.handleChangeMut.bind(this);
        this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
        this.handleRun = this.handleRun.bind(this);
    }

    handleChangePop(e){
        this.setState({populationSize: e.target.value});
    }

    handleChangeGen(e){
        this.setState({generations: e.target.value});
    }

    handleChangeMut(e){
        this.setState({mutationRate: e.target.value});
    }

    handleChangeSpeed(e){
        this.setState({speed: e.target.value});
    }

    handleRun(e){
        console.log("hi");
    }

    render(){
        //padding avoids window movement when over selection fields 
        const style = {
            padding: "10px",
        };

        return (
            <div style={style}>
                <Grid container spacing={8}>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-number"
                            label="Pop Size"
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
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel htmlFor="age-simple">Enemies</InputLabel>
                            <Select
                                value={"hi"}
                                onChange={(e) => { }}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel htmlFor="age-helper">Selection</InputLabel>
                            <Select
                                value={3}
                                onChange={() => { }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={false}

                                    value="checkedA"
                                />
                            }
                            label="Fast"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={this.handleRun} variant="contained" color="primary" size="small">Run</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={this.handleRun} variant="contained" color="secondary" size="small">Pause</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Controls;

