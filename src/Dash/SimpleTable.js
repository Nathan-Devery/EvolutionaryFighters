import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    height: 400,
    width: '100%',
    overflowX: 'auto',
    overflowY: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
    const { classes } = props;
    const rows = createData(props.populations, props.fitnessScores);

    function createData(populations, fitnessScores){
        var dataRows = [];
        var id = -1;
        for(let i = 0; i < populations.length; i++){
            for(let j = 0; j < populations[i].length; j++){
                id += 1;
                let data = {id: id, generation: i, fitness: fitnessScores[i][j], genome: 
                            populations[i][j].join(",")}
                dataRows.push(data);
            }
        }
        //dataRows.push({id: 0});
        return dataRows.reverse();
    }

    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell align="left">Individual</TableCell>
                <TableCell align="left">Generation</TableCell>
                <TableCell align="left">Fitness</TableCell>
                <TableCell align="left">Genome</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map(row => (
                <TableRow key={row.id}>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.generation}</TableCell>
                <TableCell align="left">{row.fitness}</TableCell>
                <TableCell align="left">{row.genome}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);