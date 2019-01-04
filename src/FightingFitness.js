import Matter from 'matter-js';
import FightingRobotCreator from './FightingRobotCreator';
import Simulator from './Simulator';
import EvolutionUtilities from './EvolutionUtilities';

class FightingFitness{

    static async evaluatePopulationFitness(simulator, updatesPerSecond, robotCreator, population){
        const ENEMIES_TEST_AGAINST = 5;    //Prob make a changeable parameter

        simulator.clear();

        var windowWidth = simulator.render.bounds.max.x,
            windowHeight = simulator.render.bounds.max.y,
            world = simulator.engine.world;

        var individualX = windowWidth / 5,
            enemyX = windowWidth - individualX,
            y = windowHeight / 3;

        var robotPopulation = this.generateRobotPopulation(population, robotCreator, enemyX, y);
        
        var ground = this.initializeMap(world, windowWidth, windowHeight);
        
        var fitnessScores = [];
        for(let i = 0; i < population.length; i++){
            var enemyIndex = this.generateEnemyIndex(i, population.length, ENEMIES_TEST_AGAINST);
            var individualFitness = 0;
            for(let j = 0; j < enemyIndex.length; j++){
                let individual = robotCreator.create(individualX, y, population[i], false, "individualBody");
                
                //let enemy = robotPopulation[enemyIndex[j]];

                //randomized enemy, this makes some surrounding code redundant
                let enemyGenome = EvolutionUtilities.generateIndividual(population[0].length);
                let enemy = robotCreator.create(enemyX, y, enemyGenome, true, "enemyBody");

                Matter.World.add(world, [individual.robot, enemy.robot]);

                let promise = this.testIndividual(individual, enemy, ground, simulator.engine, updatesPerSecond);
                let matchFitness = await promise;
                individualFitness += matchFitness;
                Matter.World.remove(world, [individual.robot, enemy.robot])
                simulator.engine.events = {}; 
                //reset enemy
                robotPopulation[enemyIndex[j]] = robotCreator.create(enemyX, y, population[enemyIndex[j]], true, "enemyBody");      
            }
            fitnessScores[i] = individualFitness;
        }
       return fitnessScores;
    }

    static generateRobotPopulation(population, robotCreator, x, y){
        var robotPopulation = [];
        for(let i = 0; i < population.length; i++){
            robotPopulation[i] = robotCreator.create(x, y, population[i], true, "enemyBody");
        }
        return robotPopulation;
    }

    static initializeMap(world, windowWidth, windowHeight){
        //ground just out of view
        var ground = Matter.Bodies.rectangle(0.5 * windowWidth, 1.5 * windowHeight, 
            10 * windowWidth, 0.05 * windowHeight, { isStatic: true, label: "ground"});

        var base = Matter.Bodies.rectangle(0.5 * windowWidth, 0.90 * windowHeight, 
            0.8 * windowWidth, 0.33 * windowHeight, { isStatic: true, label: "base"});

        Matter.World.add(world, [ground, base]);

        return ground;
    }

    static async testIndividual(individual, enemy, ground, engine, updatesPerSecond){
        //const TIMEOUT_DURATION = 11000;
        const TIMEOUT_DURATION = 20000;
        const proportionateTimout = (TIMEOUT_DURATION * 60) / updatesPerSecond;

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(proportionateTimout), proportionateTimout)
            //setTimeout(() => resolve(0), proportionateTimout)
            var start = new Date().getTime();
            Matter.Events.on(engine, 'beforeUpdate', function(event) {
                individual.tickFunction();
                enemy.tickFunction();
                
                var individualBodies = Matter.Composite.allBodies(individual.robot);
                var enemyBodies = Matter.Composite.allBodies(enemy.robot);
                
                var end = new Date().getTime(),
                    timeTaken = end - start,
                    timeRemaining = proportionateTimout - timeTaken;

                for(let i = 0; i < individualBodies.length; i++){
                    var individualCollision = Matter.SAT.collides(individualBodies[i], ground);
                    if(individualCollision.collided){
                        /* 
                        let end = new Date().getTime();
                        let time = end - start;
                        let fitness = -(time);
                        */

                        let fitness = proportionateTimout - timeRemaining;
                        //let fitness = 0;
                        resolve(fitness);
                    }
                }
    
                for(let i = 0; i < enemyBodies.length; i++){
                    var enemyBodiesCollision = Matter.SAT.collides(enemyBodies[i], ground);
                    if(enemyBodiesCollision.collided){ 
                        /*
                        let end = new Date().getTime();
                        let time = end - start;
                        let fitness = proportionateTimout - time;
                        */

                        let fitness = proportionateTimout + timeRemaining;
                        //let fitness = 1;
                        resolve(fitness);
                    }
                }
            }); 
        });
       return promise;
    }

    static generateEnemyIndex(individualIndex, populationLength, numEnemies){
        var enemyIndex = [];
        var max = populationLength - 1;
        var min = 0;
        for(let i = 0; i < numEnemies; i++){
            var index = individualIndex;
            while(index === individualIndex){    //Makes sure the individual doesnt fight itself
                    index = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            enemyIndex[i] = index;
        }
        return enemyIndex;
    }
}

export default FightingFitness;