// Минимальная заглушка для Matter.js
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

const engine = Engine.create();
const render = Render.create({
  element: document.getElementById('game'),
  engine: engine,
  options: { width: 300, height: 400, wireframes: false, background: '#06061a' }
});

const ground = Bodies.rectangle(150, 390, 300, 20, { isStatic: true });
World.add(engine.world, [ground]);
Engine.run(engine);
Render.run(render);