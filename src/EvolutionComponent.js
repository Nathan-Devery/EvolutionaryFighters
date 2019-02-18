import React, { Component } from 'react';
import EvolutionUtilities from './EvolutionUtilities';
import FightingRobotCreator from './FightingRobotCreator';
import Simulator from './Simulator';
import FightingFitness from './FightingFitness';
import RouletteSelector from './RouletteSelector';
import TournamentSelector from './RouletteSelector';
import Dashboard from './Dash/Dashboard';
import ErrorDisplay from './ErrorDisplay';
import AlertDialog from './Alert';

import Menu from './Menu';

class EvolutionComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            populations : [[]],
            fitnessScores : [[]],
            error: false,
            errorMsg: "hi",
            speed: true,
        }
        this.robotCreator = FightingRobotCreator;

        this.error = this.error.bind(this);
        this.run = this.run.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.handleExhibit = this.handleExhibit.bind(this);
    }

    async run(generations, populationSize, selectionF, mutationRate, randomize, poolSize){
        if(!this.validRunInput(generations, populationSize, mutationRate, poolSize)) return;

        this.clearRun(true);

        var population = EvolutionUtilities.generatePopulation(populationSize, this.robotCreator.genomeLength());
   
        for(let i = 0; i < generations; i++){
            this.fitnessFunction.setPopulation(population);
            for(let j = 0; j < population.length; j++){
                let fitnessScore = await this.fitnessFunction.evaluateIndividual(population[j], j, randomize, poolSize);
                if(fitnessScore === null) return;

                this.setState((state, props) => {
                    let clonedPops = state.populations.slice(0);
                    let clonedFitness = state.fitnessScores.slice(0);
                    if(typeof clonedPops[i] === 'undefined'){
                        clonedPops.push([population[j]]);
                        clonedFitness.push([fitnessScore]);
                    }else{
                        clonedPops[i] = clonedPops[i].concat([population[j]]);
                        clonedFitness[i].push(fitnessScore);    
                    }
                    return ({
                        populations: clonedPops,
                        fitnessScores: clonedFitness
                    })
                });
            }
            population = selectionF.selectPopulation(this.state.populations[i], this.state.fitnessScores[i]);
            let offSpring = EvolutionUtilities.crossoverPopulation(population);
            offSpring = EvolutionUtilities.mutate(offSpring, mutationRate);
            population = offSpring;
        }
    }
    
    validRunInput(generations, populationSize, mutationRate, poolSize){
        let errorMsg = "";
        if(generations < 0 || populationSize < 0 || mutationRate < 0){
            errorMsg += "Inputs must be greater than 0 \n";
        }
        if(!(populationSize % 2 == 0)){
            errorMsg += "Population size must be divisible by 2";
        }
        if(poolSize < 1){
            errorMsg += "Pool size must be greater than >=1";
        }

        if(!(errorMsg === "")) {
            this.error(errorMsg);
            return false;
        }
        return true;
    }

    async handleExhibit(genome){
        if(genome === 'undefined' || genome.length != this.robotCreator.genomeLength()){
            this.error("Invalid genome");
            return;
        }
        this.clearRun(false);
        console.log(genome);
        await this.fitnessFunction.evaluateIndividual(genome, 0, true, 5);
    }

    componentDidMount() {
        this.simulator = new Simulator(); 
        this.simulator.run(this.state.speed);
        this.fitnessFunction = new FightingFitness(this.simulator, this.robotCreator); 
        //this.run(4, 3, FightingRobotCreator, RouletteSelector, 0.05, true, 5);
    }

    error(msg){
        this.setState({error: true, errorMsg: msg});
    }

    handleRun(runArgs){
        this.run(runArgs.generations, runArgs.populationSize, runArgs.selection, 
            runArgs.mutationRate, runArgs.randomize, runArgs.poolSize);
    }

    clearRun(clearPop){
        this.fitnessFunction.stop = true;
        this.fitnessFunction = new FightingFitness(this.simulator, this.robotCreator); 
        if(clearPop){
            this.setState({
                populations : [[]],
                fitnessScores : [[]],
            })
        }
    }

    render(){
        const simStyle = {
            backgroundColor: "#eeeeee",
        }
        return (
            <div>
                <AlertDialog/>
                <div id="simulation" style={simStyle}></div>
                <Dashboard 
                    populations={this.state.populations}
                    fitnessScores={this.state.fitnessScores}
                    speed={this.state.speed}
                    handleRun={this.handleRun}
                    handleSpeed={() => {
                            this.simulator.run(!this.state.speed);
                            this.setState((state, props) => ({
                                speed: !state.speed
                            }));
                        }
                    }
                    handleExhibit={this.handleExhibit}
                />
                {this.state.error &&
                    <ErrorDisplay display={this.state.error} msg={this.state.errorMsg} 
                        handleCloseState={() => this.setState({error: false, errorMsg: ""})}/>
                }
            </div>
        )
    }
}

export default EvolutionComponent; 