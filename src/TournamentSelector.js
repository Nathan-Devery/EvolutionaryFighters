import Matter from 'matter-js';

class TournamentSelector{
    static selectPopulation(population, fitnessScores){
        var selected = [];
        for(let i = 0; i < population.length; i++){
            let randomIndex = Math.floor(Math.random() * (population.length - 1));
            if(fitnessScores[i] > fitnessScores[randomIndex]){
                selected[i] = population[i];
            }else{
                selected[i] = population[randomIndex];
            }
        }
        return selected;
    }
}

export default TournamentSelector;