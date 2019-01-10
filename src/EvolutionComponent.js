import React, { Component } from 'react';
import EvolutionUtilities from './EvolutionUtilities';
import FightingRobotCreator from './FightingRobotCreator';
import Simulator from './Simulator';
import FightingFitness from './FightingFitness';
import RouletteSelector from './RouletteSelector';
import TournamentSelector from './RouletteSelector';
import Dashboard from './Dash/Dashboard';

import Menu from './Menu';

class EvolutionComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            population : [[]],
            fitnessScores : [],
            currentFittest : null,
            currentGeneration : 0,
            updatesPerSecond: 300    //second is real time
        }
        /*
        this.simulator = new Simulator();
        this.simulator.runAtSpeed(this.state.updatesPerSecond);

        this.run(10, 10, FightingRobotCreator, FightingFitness, RouletteSelector, 0.05);
        */

        //this.run(10, 20, FightingRobotCreator, FightingFitness, TournamentSelector, 0.05);
    }

    //generations
    async run(generations, populationSize, robotCreator, fitnessF, selectionF, mutationRate){
        var population = EvolutionUtilities.generatePopulation(populationSize, robotCreator.genomeLength());
        for(let i = 0; i < generations; i++){
            var fitnessScores = await fitnessF.evaluatePopulationFitness(this.simulator, this.state.updatesPerSecond, FightingRobotCreator, population),
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
        this.simulator.runAtSpeed(this.state.updatesPerSecond);
        this.run(10, 10, FightingRobotCreator, FightingFitness, RouletteSelector, 0.05);
    }

    render(){
        const simStyle = {
            backgroundColor: "#eeeeee"
        }
        return (
            <div>
                <div id="simulation" style={simStyle}></div>
                <Dashboard/>
            </div>
        )
    }
    //<Dashboard/>

}

export default EvolutionComponent; 