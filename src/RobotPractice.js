import React, { Component } from 'react';
import './App.css';
import Matter from 'matter-js';
import EvolutionUtilities from './EvolutionUtilities';
import decomp from 'poly-decomp'
//import firebase from 'firebase';

window.decomp = require('poly-decomp'); //required for polygons

/*
var config = {
    apiKey: "AIzaSyAd1iA-S7nzkhrV-9Js7vH-yBL4OK4grFU",
    authDomain: "evolution-7397e.firebaseapp.com",
    databaseURL: "https://evolution-7397e.firebaseio.com",
    projectId: "evolution-7397e",
    storageBucket: "evolution-7397e.appspot.com",
    messagingSenderId: "43591304433"
  };
firebase.initializeApp(config);
*/

class RobotPractice extends Component{
    constructor(props){
        super(props);

    }

    simulate(){
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            World = Matter.World,
            Bodies = Matter.Bodies;

        // create engine
        var engine = Engine.create(),
            world = engine.world;
        
        //engine.timing.timeScale = 1;

        //60 is the normal
        var updatesPerSecond = 500;
        //Only change outta function not inner
        setInterval(function() {
            Engine.update(engine, 1000 / 60);
        }, 1000 / updatesPerSecond);
        
        var windowWidth = 1280,
            height = 600;

        // create renderer
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: windowWidth,
                height: height,
            }
        });
        
        Render.run(render);

        /*
        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);
        */

        var ground = Bodies.rectangle(640, 550, 1000, 200, { isStatic: true });

        var aX = windowWidth/5,
            aY = 200,
            bX = windowWidth - aX;

        var robotA = this.robotFromGenome(aX, aY, this.instantiateGenome(13), false);
        var robotB = this.robotFromGenome(bX, aY, this.instantiateGenome(13), true);

        Matter.Events.on(engine, 'beforeUpdate', function(event) {
            robotA.tickFunction();
            robotB.tickFunction();
        });

        //World.add(engine.world, [ground, robotA.robot, robotB.robot]);
        World.add(world, [ground, robotA.robot, robotB.robot]);
    }

    instantiateGenome(size){
        var genome = [];
        for(var i = 0; i < size; i++){
            genome[i] = Math.random();
        }
        console.log(genome);
        return genome;
    }

    //Centre creation coordinates 
    makeMinimalRobot(x, y, flip){
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        const MAX_WHEEL_SIZE = MAX_HEIGHT/3;
        const MAX_WIDTH_SCALE = 3;
        const MAX_SPIKE_HEIGHT_SCALE = 3;
        const WHEEL_VELOCITY = 1;

        var Bodies = Matter.Bodies,
        Vertices = Matter.Vertices;

        var group = Matter.Body.nextGroup(true);
        var robotComposite = Matter.Composite.create();
        
        var width = MAX_WIDTH * 1;
        var height = MAX_HEIGHT * 1;
        var body = Matter.Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                group: group
            }
        });
        
        //randomized vertices seems to work fine
        var spikeVertices = Vertices.fromPath('50 50 75 -50 100 50');
    
        //multiply by non absolutes 
        var spike = Bodies.fromVertices(x + width/2 * 1, y + height/2 * 1, spikeVertices);

        /*
        var compoundSpike = Matter.Body.create({
            parts: [spike],  //add spikeTop? 
            collisionFilter: group 
        });
        */
        
        Matter.Body.scale(spike, MAX_WIDTH_SCALE * 1, MAX_SPIKE_HEIGHT_SCALE * 1);

        //Matter.Body.scale(spikeTop, MAX_HEIGHT_SCALE/2, MAX_HEIGHT_SCALE);

        var radians = Math.PI * (2 * 0.25);    //abs 1
        Matter.Body.rotate(spike, radians);

        var compoundBody = Matter.Body.create({
            parts: [body, spike],
            collisionFilter: {
                group: group
            }
        });
        
        var wheelAXOffset = width/2 * 1;
        var wheelAYOffset = height/2 * 1;
        var wheelASize = MAX_WHEEL_SIZE * 1;
        var wheelA = Matter.Bodies.circle(x + wheelAXOffset, y + wheelAYOffset, wheelASize, { 
            collisionFilter: {
                group: group
            },
            friction: 1
        });
        
        var wheelBXOffset = width/2 * 1;
        var wheelBYOffset  = height/2 * 1;
        var wheelBSize = MAX_WHEEL_SIZE * 1;
        var wheelB = Matter.Bodies.circle(x - wheelBXOffset, y + wheelBYOffset, wheelBSize, { 
            collisionFilter: {
                group: group
            },
            friction: 1
        });

       var axelAXOffset = flip ? -wheelAXOffset : wheelAXOffset;
       var axelA = Matter.Constraint.create({
           bodyA: wheelA,
           bodyB: compoundBody,
           pointB: { x: axelAXOffset, y: wheelAYOffset},
           stiffness: 1,
           length: 0,
       });

        var axelBXOffset = flip ? wheelBXOffset : -wheelBXOffset;
        var axelB = Matter.Constraint.create({
            bodyA: wheelB,
            bodyB: compoundBody,
            pointB: { x: axelBXOffset, y: wheelBYOffset},
            stiffness: 1,
            length: 0
        });
        
        Matter.Composite.add(robotComposite, compoundBody);
        Matter.Composite.add(robotComposite, wheelA);
        Matter.Composite.add(robotComposite, wheelB);
        Matter.Composite.add(robotComposite, axelA);
        Matter.Composite.add(robotComposite, axelB);

        //flips, add angular velocity reverse
        
        var directionWheelVelocity;
        if(flip){
            Matter.Composite.scale(robotComposite, -1, 1, {x:x, y:y});
            directionWheelVelocity = -WHEEL_VELOCITY;
        }else{
            directionWheelVelocity = WHEEL_VELOCITY;
        }

        /*
        var notCollided = true;
        Matter.Events.on(engine, 'beforeUpdate', function(event) {
            var collision = Matter.SAT.collides(compoundSpike, ground);
            if(collision.collided && notCollided){
                console.log("stabbed");
                notCollided = false;
            }
        });
        */

        var tickFunction = () => {
            Matter.Body.setAngularVelocity(wheelA, directionWheelVelocity);
            Matter.Body.setAngularVelocity(wheelB, directionWheelVelocity);
        }

        return {
            robot: robotComposite,
            tickFunction: tickFunction
        };
    }

    render(){
        //this.renderMatter();
        //this.renderRobot();
        this.simulate();
        return(
            <div id="RAND">
                
            </div>
        );
    }

    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} genome bodyWidth, bodyHeight, spikeXOffset, spikeYOffset, spikeWidthScale, 
     *                   spikeHeightScale, spikeRotation,   
     *                   [wheelAXOffset, wheelAYOffset, WheelASize] x2 
     * @param {*} flip 
     */
    robotFromGenome(x, y, genome, flip){
        const MAX_WIDTH = 150;
        const MAX_HEIGHT = 150;
        const MAX_WHEEL_SIZE = MAX_HEIGHT/3;
        const MAX_WIDTH_SCALE = 3;
        const MAX_SPIKE_HEIGHT_SCALE = 3;
        const WHEEL_VELOCITY = 1;

        var Bodies = Matter.Bodies,
        Vertices = Matter.Vertices;

        var group = Matter.Body.nextGroup(true);
        var robotComposite = Matter.Composite.create();
        
        var width = MAX_WIDTH * Math.abs(genome[0]);
        var height = MAX_HEIGHT * Math.abs(genome[1]);
        var body = Matter.Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                group: group
            }
        });
        
        var spikeVertices = Vertices.fromPath('50 50 75 -50 100 50');
        var spike = Bodies.fromVertices(x + width/2 * genome[2], y + height/2 * genome[3], 
            spikeVertices);

        Matter.Body.scale(spike, MAX_WIDTH_SCALE * genome[4], MAX_SPIKE_HEIGHT_SCALE * genome[5]);

        var radians = Math.PI * (2 * genome[6]);
        Matter.Body.rotate(spike, radians);

        var compoundBody = Matter.Body.create({
            parts: [body, spike],
            collisionFilter: {
                group: group
            }
        });
        
        var wheelAXOffset = width/2 * genome[7];
        var wheelAYOffset = height/2 * genome[8];
        var wheelASize = MAX_WHEEL_SIZE * Math.abs(genome[9]);
        var wheelA = Matter.Bodies.circle(x + wheelAXOffset, y + wheelAYOffset, wheelASize, { 
            collisionFilter: {
                group: group
            },
            friction: 1
        });
        
        var wheelBXOffset = width/2 * genome[10];
        var wheelBYOffset  = height/2 * genome[11];
        var wheelBSize = MAX_WHEEL_SIZE * Math.abs(genome[12]);
        var wheelB = Matter.Bodies.circle(x - wheelBXOffset, y + wheelBYOffset, wheelBSize, { 
            collisionFilter: {
                group: group
            },
            friction: 1
        });

       var axelAXOffset = flip ? -wheelAXOffset : wheelAXOffset;
       var axelA = Matter.Constraint.create({
           bodyA: wheelA,
           bodyB: compoundBody,
           pointB: { x: axelAXOffset, y: wheelAYOffset},
           stiffness: 1,
           length: 0,
       });

        var axelBXOffset = flip ? wheelBXOffset : -wheelBXOffset;
        var axelB = Matter.Constraint.create({
            bodyA: wheelB,
            bodyB: compoundBody,
            pointB: { x: axelBXOffset, y: wheelBYOffset},
            stiffness: 1,
            length: 0
        });
        
        Matter.Composite.add(robotComposite, compoundBody);
        Matter.Composite.add(robotComposite, wheelA);
        Matter.Composite.add(robotComposite, wheelB);
        Matter.Composite.add(robotComposite, axelA);
        Matter.Composite.add(robotComposite, axelB);

        var directionWheelVelocity;
        if(flip){
            Matter.Composite.scale(robotComposite, -1, 1, {x:x, y:y});
            directionWheelVelocity = -WHEEL_VELOCITY;
        }else{
            directionWheelVelocity = WHEEL_VELOCITY;
        }

        /*
        var notCollided = true;
        Matter.Events.on(engine, 'beforeUpdate', function(event) {
            var collision = Matter.SAT.collides(compoundSpike, ground);
            if(collision.collided && notCollided){
                console.log("stabbed");
                notCollided = false;
            }
        });
        */

        var tickFunction = () => {
            Matter.Body.setAngularVelocity(wheelA, directionWheelVelocity);
            Matter.Body.setAngularVelocity(wheelB, directionWheelVelocity);
        }

        return {
            robot: robotComposite,
            tickFunction: tickFunction
        };
    }

    render(){
        //this.renderMatter();
        //this.renderRobot();
        this.simulate();
        return(
            <div id="RAND">
                
            </div>
        );
    }
}


export default RobotPractice;