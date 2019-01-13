import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Controls from './Controls';
import EnhancedTable from './EnhancedTable';
import Plot from './Plot';
import Exhibitor from './Exhibitor';

class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const gridStyle = {
            margin: "0px",
            padding: "3px",
            paddingTop: "0px",
            backgroundColor: "#eeeeee",
            width: "100%"
        };

        const additionalPanelStyle = {
            marginTop: "8px",
        };

        const panelStyle = {
            height: "500px"
        };
        
        return (
            //<Controls/>
            //<div align="center">  avoided excessive center align

            <div>
                <Grid container spacing={8} style={gridStyle} >
                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Controls 
                                handleRun={this.props.handleRun}
                                handleSpeed={this.props.handleSpeed}
                                speed={this.props.speed}
                            />
                        </Paper>
                        <Paper style={additionalPanelStyle}>
                            <Exhibitor/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper>
                            <EnhancedTable/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Plot style={panelStyle}/>
                        </Paper> 
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Dashboard;