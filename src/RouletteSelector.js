import Matter from 'matter-js';

// maybe add up to 40% chance of not using wheel and random selection early to stop loss of diversity
class RouletteSelector{
    /*
    static selectPopulation(population, fitnessScores){
        var selected = [];
        for(let i = 0; i < population.length/2; i++){
            selected[i] = population[this.selectIndividual(population, fitnessScores)];
        }
        return selected
    }
    */

    static selectPopulation(population, fitnessScores){
        var selected = [];
        for(let i = 0; i < population.length; i++){
            selected[i] = population[this.selectIndividual(population, fitnessScores)];
        }
        return selected
    }

    static selectIndividual(population, fitnessScores){
        var sumFitness = 0;
        for(let i = 0; i < fitnessScores.length; i++){
            sumFitness += fitnessScores[i];
        }
        
        var randomVal = Math.random();

        var lowerBound = 0;
        for(let i = 0; i < fitnessScores.length; i++){
            let chance = fitnessScores[i] / sumFitness;
            let upperBound = lowerBound + chance;
            
            if(randomVal >= lowerBound && randomVal <= upperBound) return i;
            lowerBound += chance;
        }
        return fitnessScores.length - 1;
    }

}

export default RouletteSelector;