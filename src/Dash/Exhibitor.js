import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class Exhibitor extends Component{
    constructor(props){
        super(props);
        this.handlePress = this.handlePress.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.state = {
            genome: ""
        }
    }

    handlePress(){
        let genome = this.state.genome.split(',').map(function(item) {
            return parseFloat(item);
        });
        this.props.handleExhibit(genome);
    }

    handleTextChange(e){
        this.setState({genome: e.target.value})
    }

    render(){
        const style = {
            margin: "0px",
            padding: "10px",
        };

        const style2 = {
            width: "100%"
        }

        return (
            <div style={style}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                    <TextField style={style2}
                            id="standard-number"
                            label="Genome"
                            type="number"
                            value={this.state.textValue}
                            onChange={this.handleTextChange}
                            multiline={true}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />  
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={this.handlePress} 
                            variant="contained" 
                            color="primary" 
                            size="small">
                            Exhibit
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Exhibitor;
