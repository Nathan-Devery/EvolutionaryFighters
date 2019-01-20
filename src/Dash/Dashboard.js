import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Controls from './Controls';
import EnhancedTable from './EnhancedTable';
import Plot from './Plot';
import Exhibitor from './Exhibitor';
import ReactVirtualizedTable from './ReactVirtualizedTable';
import SimpleTable from './SimpleTable';

class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const gridStyle = {
            margin: "0px",
            padding: "4px",
            paddingTop: "0px",
            width: "100%",
            backgroundColor: "#eeeeee"   
        };

        const panelStyle = {
            height: "100%"
        };
        
        return (
            //<Controls/>
            //<div align="center">  avoided excessive center align

            //<ReactVirtualizedTable/>
            <div>
                <Grid container spacing={8} style={gridStyle} >
                    <Grid item xs={12} md={4}>
                        <Paper style={panelStyle}>
                            <Controls 
                                handleRun={this.props.handleRun}
                                handleSpeed={this.props.handleSpeed}
                                speed={this.props.speed}
                            />
                            <Exhibitor handleExhibit={this.props.handleExhibit}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper>
                            <SimpleTable 
                                populations={this.props.populations}
                                fitnessScores={this.props.fitnessScores}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Dashboard;


/*
<Grid item xs={12} md={4}>
                        <Paper style={panelStyle}>
                            <Plot fitnessScores={this.props.fitnessScores}/>
                        </Paper> 
                    </Grid>
*/