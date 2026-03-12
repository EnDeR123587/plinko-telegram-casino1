// Простейший пример physics.js с Matter.js
const { Engine, Render, Runner, Bodies, World } = Matter;

const engine = Engine.create();
const world = engine.world;

const canvas = document.getElementById("game");
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: { width: 400, height: 500, wireframes: false, background: "#111" }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Пол
const ground = Bodies.rectangle(200, 490, 400, 20, { isStatic: true });
World.add(world, [ground]);

// Шарик
function dropBall() {
    const ball = Bodies.circle(200, 50, 10, { restitution: 0.5 });
    World.add(world, [ball]);
}

canvas.addEventListener("click", dropBall);
