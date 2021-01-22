import Matter from 'matter-js';
window.decomp = require('poly-decomp');

class FightingRobotCreator{
    static genomeLength(){
        return 13;
    }

    static create(x, y, genome, flip, label){
        const proportionalWidth = window.innerWidth / 1280;
        const proportionalHeight = window.innerHeight / 610;

        const MAX_WIDTH = 170;  
        const MAX_HEIGHT = 170;
        const MAX_SPIKE_WIDTH_SCALE = 2;
        const MAX_SPIKE_HEIGHT_SCALE = 3;
        //const MAX_WHEEL_SIZE = MAX_HEIGHT/2;
        const MAX_WHEEL_SIZE = MAX_HEIGHT/4;
        const WHEEL_TORQUE = 1.5;
        const MIN_WHEEL_SIZE = 20;

        var Bodies = Matter.Bodies,
            Vertices = Matter.Vertices;

        var group = Matter.Body.nextGroup(true);
        var robotComposite = Matter.Composite.create();
        
        var width = MAX_WIDTH * Math.abs(genome[0]);
        var height = MAX_HEIGHT * Math.abs(genome[1]);
        var body = Matter.Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                group: group
            },
            label: label
        });
    
        var spikeVertices = Vertices.fromPath('50 50 75 -50 100 50');
        var spike = Bodies.fromVertices(x + width/2 * genome[2], y + height/2 * genome[3], 
            spikeVertices, {label: label});

        Matter.Body.scale(spike, MAX_SPIKE_WIDTH_SCALE * genome[4], MAX_SPIKE_HEIGHT_SCALE * genome[5]);

        var radians = Math.PI * (2 * genome[6]);
        Matter.Body.rotate(spike, radians);

        var compoundBody = Matter.Body.create({
            parts: [body, spike],
            collisionFilter: {
                group: group
            },
            label: label
        });

        let maxSpike = Bodies.fromVertices(x + width/2, y + height/2, spikeVertices),
            maxBody = Matter.Bodies.rectangle(x, y, MAX_WIDTH, MAX_HEIGHT)
        
        Matter.Body.scale(maxSpike, MAX_SPIKE_WIDTH_SCALE, MAX_SPIKE_HEIGHT_SCALE);

        let maxBodyMass = maxSpike.mass + maxBody.mass,
            proportionalBodyMass = compoundBody.mass / maxBodyMass;

        var wheelAXOffset = width/2 * genome[7];
        var wheelAYOffset = height/2 * genome[8];
        var wheelASize = MAX_WHEEL_SIZE * proportionalBodyMass * Math.abs(genome[9]);
        wheelASize += MIN_WHEEL_SIZE;
        var wheelA = Matter.Bodies.circle(x + wheelAXOffset, y + wheelAYOffset, wheelASize, { 
            collisionFilter: {
                group: group
            },
            friction: 1,
            label: label
        });
        
        var wheelBXOffset = width/2 * genome[10];
        var wheelBYOffset  = height/2 * genome[11];
        var wheelBSize = MAX_WHEEL_SIZE * proportionalBodyMass * Math.abs(genome[12]);
        wheelBSize += MIN_WHEEL_SIZE;
        var wheelB = Matter.Bodies.circle(x - wheelBXOffset, y + wheelBYOffset, wheelBSize, { 
            collisionFilter: {
                group: group
            },
            friction: 1,
            label: label
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
        // Matter.Composite.add(robotComposite, wheelB); //two wheels often leads one not being used
        Matter.Composite.add(robotComposite, axelA);
        Matter.Composite.add(robotComposite, axelB);

        /*
        let maxWheel = Matter.Bodies.circle(x, y, MAX_WHEEL_SIZE),
            maxTotalMass = maxBodyMass + maxWheel.mass * 2,
            proportionalTotalMass = (compoundBody.mass + wheelA.mass + wheelB.mass + spike.mass) / maxTotalMass;

        var proportionalTorque = WHEEL_TORQUE * proportionalTotalMass;
        */

        var proportionalTorque = WHEEL_TORQUE * proportionalBodyMass;

        if(flip){
            Matter.Composite.scale(robotComposite, -1, 1, {x:x, y:y});
            proportionalTorque = -proportionalTorque
        }

        var printed = false;
        var tickFunction = () => {
            //Matter.Body.setAngularVelocity(wheelA, directionWheelVelocity);
            //Matter.Body.setAngularVelocity(wheelB, directionWheelVelocity);

            wheelA.torque = proportionalTorque;
            wheelB.torque = proportionalTorque;  
        }

        return {
            robot: robotComposite,
            tickFunction: tickFunction
        };
    }
    
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} genome bodyWidth, bodyHeight, spikeXOffset, spikeYOffset, spikeWidthScale, 
     *                   spikeHeightScale, spikeRotation,   
     *                   [wheelAXOffset, wheelAYOffset, WheelASize] x2 
     * @param {*} flip 
     * @param {*} label labels body parts
     */

     /*
    static create(x, y, genome, flip, label){
        const MAX_WIDTH = 170;  
        const MAX_HEIGHT = 170;
        const MAX_WHEEL_SIZE = MAX_HEIGHT/5;
        const MAX_WIDTH_SCALE = 3;
        const MAX_SPIKE_HEIGHT_SCALE = 3;
        const WHEEL_VELOCITY = 0.5;

        var Bodies = Matter.Bodies,
        Vertices = Matter.Vertices;

        var group = Matter.Body.nextGroup(true);
        var robotComposite = Matter.Composite.create();
        
        var width = MAX_WIDTH * Math.abs(genome[0]);
        var height = MAX_HEIGHT * Math.abs(genome[1]);
        var body = Matter.Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                group: group
            },
            label: label
        });
        
        var spikeVertices = Vertices.fromPath('50 50 75 -50 100 50');
        var spike = Bodies.fromVertices(x + width/2 * genome[2], y + height/2 * genome[3], 
            spikeVertices, {label: label});

        Matter.Body.scale(spike, MAX_WIDTH_SCALE * genome[4], MAX_SPIKE_HEIGHT_SCALE * genome[5]);

        var radians = Math.PI * (2 * genome[6]);
        Matter.Body.rotate(spike, radians);

        var compoundBody = Matter.Body.create({
            parts: [body, spike],
            collisionFilter: {
                group: group
            },
            label: label
        });
        
        var wheelAXOffset = width/2 * genome[7];
        var wheelAYOffset = height/2 * genome[8];
        var wheelASize = MAX_WHEEL_SIZE * Math.abs(genome[9]);
        var wheelA = Matter.Bodies.circle(x + wheelAXOffset, y + wheelAYOffset, wheelASize, { 
            collisionFilter: {
                group: group
            },
            friction: 1,
            label: label
        });
        
        var wheelBXOffset = width/2 * genome[10];
        var wheelBYOffset  = height/2 * genome[11];
        var wheelBSize = MAX_WHEEL_SIZE * Math.abs(genome[12]);
        var wheelB = Matter.Bodies.circle(x - wheelBXOffset, y + wheelBYOffset, wheelBSize, { 
            collisionFilter: {
                group: group
            },
            friction: 1,
            label: label
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

        var tickFunction = () => {
            Matter.Body.setAngularVelocity(wheelA, directionWheelVelocity);
            Matter.Body.setAngularVelocity(wheelB, directionWheelVelocity);  
        }

        return {
            robot: robotComposite,
            tickFunction: tickFunction
        };
    }
    */

}

export default FightingRobotCreator;