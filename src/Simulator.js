import Matter from 'matter-js';

class Simulator{
    constructor(){
        this.initialize();
    }

    initialize(){
        var Engine = Matter.Engine,
            Render = Matter.Render;

        // create engine
        this.engine = Engine.create();

        this. engine.timing.timeScale = 1;

        var windowWidth = 1280,
            windowHeight = 600;

        // create renderer
        this.render = Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: windowWidth,
                height: windowHeight,
                //wireframes: false     this must b false to use colours
            }
        });
        
        Render.run(this.render);
    }

    runAtSpeed(updatesPerSecond){
        if(!(this.intervalID == null)){
            clearInterval(this.intervalID);
        }
        
        var engine = this.engine;
        this.intervalID = setInterval(function() {
            Matter.Engine.update(engine, 1000 / 60);
        }, 1000 / updatesPerSecond);
    }

    clear(){
        let engine = this.engine;
        Matter.World.clear(engine.world);
        Matter.Engine.clear(engine);
        engine.events = {};
    }
}

export default Simulator;
