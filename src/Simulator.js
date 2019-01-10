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

        this.engine.timing.timeScale = 1;

        var windowWidth = window.innerWidth * 0.987,    //The simulation width is too wide?
            windowHeight = Math.floor(window.innerHeight * 0.66);   //Not 0.66 to avoid scroll down

        // create renderer
        this.render = Render.create({
            element: document.getElementById("simulation"),
            engine: this.engine,
            options: {
                width: windowWidth,
                height: windowHeight,
                //wireframes: false     this must b false to use colours
            }
        });

        Render.setPixelRatio(this.render, 'auto')

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
