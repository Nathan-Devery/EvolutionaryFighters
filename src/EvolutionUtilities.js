import Matter from 'matter-js'
//import React, { Component } from 'react';

class EvolutionUtilities{    

    /*
    static generatePopulation(populationSize, genomeSize){
        var population = [[]];
        for(var i = 0; i < populationSize; i++){
            population[i] = [];
            for(var j = 0; j < genomeSize; j++){
                let value = Math.random();
                value *= Math.floor(Math.random()*2) === 1 ? 1 : -1;
                population[i][j] = value;
            }
        }
        return population;
    }
    */

   static generatePopulation(populationSize, genomeSize){
    var population = [[]];
    for(var i = 0; i < populationSize; i++){
        population[i] = this.generateIndividual(genomeSize);
    }
    return population;
    }

    static generateIndividual(genomeSize){
        if(genomeSize <= 0 || genomeSize > 999) throw error("Invalid genome size, must be >0, <1000")

        let individual = [];
        for(var i = 0; i < genomeSize; i++){
            let value = Math.random();
            value *= Math.floor(Math.random()*2) === 1 ? 1 : -1;
            individual[i] = value;
        }
        return individual;
    }

    static crossoverPopulation(breeders){
        let shuffled = this.shuffleArray(breeders);

        var allOffSpring = [];
        for(let i = 0; i < shuffled.length - 1; i += 2){
            let offSpring = this.crossover(shuffled[i], shuffled[i+1]);
            allOffSpring.push(offSpring[0], offSpring[1]);
        }
        return allOffSpring;
    }
    
    static crossover(individualA, individualB){
        let point1 = Math.floor(Math.random() * (individualA.length - 1)) + 0,
            point2 = Math.floor(Math.random() * ((individualA.length - 1) - (point1 + 1) + 1)) + (point1 + 1);

        let setA1 = individualA.slice(0, point1),
            setA2 = individualA.slice(point1, point2),
            setA3 = individualA.slice(point2, individualA.length);

        let setB1 = individualB.slice(0, point1),
            setB2 = individualB.slice(point1, point2),
            setB3 = individualB.slice(point2, individualA.length);

        let offspringA = setA1.concat(setB2).concat(setA3),
            offspringB = setB1.concat(setA2).concat(setB3);
        
        return [offspringA, offspringB];
    }

    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static mutate(population, rate){
        let mutated = [];
        for(let i = 0; i < population.length; i++){
            mutated[i] = [];
            for(let j = 0; j < population[i].length; j++){
                mutated[i][j] = population[i][j];
                if(Math.random() <= rate){
                    let value = Math.random();
                    value *= Math.floor(Math.random()*2) === 1 ? 1 : -1;
                    mutated[i][j] = value;
                }
            }
        }
        return mutated;
    }
}


export default EvolutionUtilities;