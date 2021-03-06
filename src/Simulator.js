import Matter from 'matter-js';
import hacktimer from 'hacktimer';

class Simulator{
    constructor(){
        this.SLOW_UPDATES_SECOND = 60;
        this.FAST_UPDATES_SECOND = 400;
        this.initialize();
    }

    initialize(){
        var Engine = Matter.Engine,
            Render = Matter.Render;

        // create engine
        this.engine = Engine.create();

        this.engine.timing.timeScale = 1;

        //* 0.987
        var windowWidth = window.innerWidth * 1,
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

        //Render.setPixelRatio(this.render, 'auto') detailed but slow

        Render.run(this.render);
    }

    run(fast){
        this.updatesPerSecond = fast ? this.FAST_UPDATES_SECOND : this.SLOW_UPDATES_SECOND;

        if(!(this.intervalID == null)){
            clearInterval(this.intervalID);
        }
        
        var engine = this.engine;
        this.intervalID = setInterval(function() {
            Matter.Engine.update(engine, 1000 / 60);
        }, 1000 / this.updatesPerSecond);
    }
    
    clear(){
        let engine = this.engine;
        Matter.World.clear(engine.world);
        Matter.Engine.clear(engine);
        engine.events = {};
    }
}

export default Simulator;
