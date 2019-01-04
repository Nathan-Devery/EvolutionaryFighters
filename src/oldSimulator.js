import Matter from 'matter-js';

class Simulator{
    static run(){
        var DEFAULT_UPDATES_PER_SECOND = 60;

        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            World = Matter.World,
            Bodies = Matter.Bodies;

        // create engine
        var engine = Engine.create(),
            world = engine.world;

        engine.timing.timeScale = 1;

        var windowWidth = 1280,
            windowHeight = 600;

        // create renderer
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: windowWidth,
                height: windowHeight,
                //wireframes: false     this must b false to use colours
            }
        });
        
        Render.run(render);

        /*
        // runner, replace with manual updates calls for speed change
        var runner = Runner.create();
        Runner.run(runner, engine);
        */

        setInterval(function() {
            Engine.update(engine, 1000 / 60);
        }, 1000 / DEFAULT_UPDATES_PER_SECOND);

        return {
            engine: engine,
            render: render,
            clear: () => {
                World.clear(engine.world);
                Engine.clear(engine);
                engine.events = {};
            },
            stop: () => {
                //Matter.Render.stop(render);
                //Matter.Runner.stop(runner);
            },
            changeSpeed: (updatesPerSec) => {
                clearInterval();
                setInterval(function() {
                    Engine.update(engine, 1000 / 60);
                }, 1000 / updatesPerSec);
            }
        };
    }
}

export default Simulator;


/*
return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
    }
};
*/