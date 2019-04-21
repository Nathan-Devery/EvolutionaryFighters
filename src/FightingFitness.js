import Matter from 'matter-js';
import FightingRobotCreator from './FightingRobotCreator';
import Simulator from './Simulator';
import EvolutionUtilities from './EvolutionUtilities';

class FightingFitness{
    constructor(simulator, robotCreator){
        this.stop = false;

        this.simulator = simulator;
        this.world = simulator.engine.world;
        this.robotCreator = robotCreator;

        this.windowWidth = simulator.render.bounds.max.x;
        this.windowHeight = simulator.render.bounds.max.y;

        this.individualX = this.windowWidth / 5;
        this.enemyX = this.windowWidth - this.individualX;
        this.y = this.windowHeight / 3;
    }

    setPopulation(population){
        this.population = population;
        this.robotPopulation = this.generateRobotPopulation(population, 
            this.robotCreator, this.enemyX, this.y);
    }

    async evaluateIndividual(individualGene, individualIndex, randomize, poolSize){
        this.simulator.clear();
        var ground = this.initializeMap(this.world, this.windowWidth, this.windowHeight);
        
        var enemyIndex;
        if(!randomize){
            enemyIndex = this.generateEnemyIndex(individualIndex, this.robotPopulation.length, poolSize);
        }
        var individualFitness = 0;

        for(let j = 0; j < poolSize; j++){
            if(this.stop){
                return null;
            }

            let individual = this.robotCreator.create(this.individualX, this.y, individualGene, false, "individualBody");
            
            let enemy;
            if(randomize){
                let enemyGenome = EvolutionUtilities.generateIndividual(individualGene.length);
                enemy = this.robotCreator.create(this.enemyX, this.y, enemyGenome, true, "enemyBody");
            }else{
                enemy = this.robotPopulation[enemyIndex[j]];
            }

            Matter.World.add(this.world, [individual.robot, enemy.robot]);

            let promise = this.testIndividual(individual, enemy, ground, this.simulator.engine, this.simulator.updatesPerSecond);
            let matchFitness = await promise;
            if(matchFitness == null){
                return null;
            }

            individualFitness += matchFitness;
            Matter.World.remove(this.world, [individual.robot, enemy.robot])
            this.simulator.engine.events = {}; 
            //reset enemy
            if(!randomize)this.robotPopulation[enemyIndex[j]] = this.robotCreator.create(this.enemyX, this.y, this.population[enemyIndex[j]], true, "enemyBody");      
        }
        return individualFitness;
    }

    generateRobotPopulation(population, robotCreator, x, y){
        var robotPopulation = [];
        for(let i = 0; i < population.length; i++){
            robotPopulation[i] = robotCreator.create(x, y, population[i], true, "enemyBody");
        }
        return robotPopulation;
    }

    initializeMap(world, windowWidth, windowHeight){
        //ground just out of view
        var ground = Matter.Bodies.rectangle(0.5 * windowWidth, 1.5 * windowHeight, 
            10 * windowWidth, 0.05 * windowHeight, { isStatic: true, label: "ground"});

        var base = Matter.Bodies.rectangle(0.5 * windowWidth, 0.90 * windowHeight, 
            0.8 * windowWidth, 0.33 * windowHeight, { isStatic: true, label: "base"});

        Matter.World.add(world, [ground, base]);

        return ground;
    }

    async testIndividual(individual, enemy, ground, engine, updatesPerSecond){
        const TIMEOUT_DURATION = 30000;
        const proportionateTimout = (TIMEOUT_DURATION * 60) / updatesPerSecond;

        let promise = new Promise((resolve, reject) => {
            //setTimeout(() => resolve(proportionateTimout), proportionateTimout)

            setTimeout(() => resolve(0), proportionateTimout)
            var start = new Date().getTime();

            let context = this;
            Matter.Events.on(engine, 'beforeUpdate', function(event) {
                //console.log(context.stop);
                if(context.stop) {
                    resolve(null);
                }
                
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

                        //let fitness = proportionateTimout - timeRemaining;
                        let fitness = 0;
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

                        //let fitness = proportionateTimout + timeRemaining;
                        let fitness = 1;
                        resolve(fitness);
                    }
                }
            }); 
        });
       return promise;
    }

    generateEnemyIndex(individualIndex, populationLength, numEnemies){
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