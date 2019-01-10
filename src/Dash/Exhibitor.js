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
                            value="0.6055879831647537,0.3268454720424363,0.3305674482389127,-0.21336530285438804,0.3208531250348077,-0.37323782072628764,-0.48180249676787623,0.24433340742356702,0.46102817709591726,0.8392965158885508,-0.08410862957851495,-0.06398418575868314,-0.3755416909248195"	
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
                        <Button onClick={this.handleRun} variant="contained" color="primary" size="small">Exhibit</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Exhibitor;
