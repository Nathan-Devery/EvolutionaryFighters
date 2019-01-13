import React, { Component } from 'react';
import EvolutionUtilities from './EvolutionUtilities';
import FightingRobotCreator from './FightingRobotCreator';
import Simulator from './Simulator';
import FightingFitness from './FightingFitness';
import RouletteSelector from './RouletteSelector';
import TournamentSelector from './RouletteSelector';
import Dashboard from './Dash/Dashboard';
import ErrorDisplay from './ErrorDisplay';

import Menu from './Menu';

class EvolutionComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            population : [[]],
            fitnessScores : [],
            currentFittest : null,
            currentGeneration : 0,
            error: false,
            errorMsg: "hi",
            speed: true,
        }

        this.error = this.error.bind(this);
        this.run = this.run.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.error = this.error.bind(this);

        /*
        this.simulator = new Simulator();
        this.simulator.runAtSpeed(this.state.updatesPerSecond);

        this.run(10, 10, FightingRobotCreator, FightingFitness, RouletteSelector, 0.05);
        */

        //this.run(10, 20, FightingRobotCreator, FightingFitness, TournamentSelector, 0.05);
    }

    //generations
    async run(generations, populationSize, robotCreator, selectionF, mutationRate, randomize, poolSize){
        var population = EvolutionUtilities.generatePopulation(populationSize, robotCreator.genomeLength());
        for(let i = 0; i < generations; i++){
            var fitnessScores = await FightingFitness.evaluatePopulationFitness(this.simulator, FightingRobotCreator, population, randomize, poolSize),
                population = selectionF.selectPopulation(population, fitnessScores),
                offSpring = EvolutionUtilities.crossoverPopulation(population);

            offSpring = EvolutionUtilities.mutate(offSpring, mutationRate);
            //population = population.concat(offSpring);
            population = offSpring;

            console.log("Generation:" + i);
            console.log(fitnessScores);
            for(let j = 0; j < population.length; j++){
                console.log("")
                console.log("individual" + j + ": " + population[j]);
                console.log("fitness: " + fitnessScores[j]);
                console.log("");
            }
        }
    }

    componentDidMount() {
        this.simulator = new Simulator();
        this.simulator.run(this.state.speed);
        //this.run(4, 3, FightingRobotCreator, RouletteSelector, 0.05, true, 5);
    }

    error(msg){
        this.setState({error: true, errorMsg: msg});
    }

    /*
            populationSize: 20,
            generations: 10,
            poolSize: 5,
            mutationRate: 5,
            randomized: true,
            selector: 1,
    */
    handleRun(runArgs){
        this.run(runArgs.generations, runArgs.populationSize, FightingRobotCreator, runArgs.selection, 
            runArgs.mutationRate, runArgs.randomize, runArgs.poolSize);

        //async run(generations, populationSize, robotCreator, selectionF, mutationRate, randomize, poolSize){
    }

    render(){        
        const simStyle = {
            backgroundColor: "#eeeeee"
        }
        return (
            <div>
                <div id="simulation" style={simStyle}></div>
                <Dashboard 
                    speed={this.state.speed}
                    handleRun={this.handleRun}
                    handleSpeed={() => {
                            this.simulator.run(!this.state.speed);
                            this.setState((state, props) => ({
                                speed: !state.speed
                            }));
                        }
                    }
                />
                {this.state.error &&
                    <ErrorDisplay display={this.state.error} msg={this.state.errorMsg} 
                        handleCloseState={() => this.setState({error: false, errorMsg: ""})}/>
                }
            </div>
        )
    }
    //<Dashboard/>

}

export default EvolutionComponent; 