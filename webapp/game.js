// Визуализация шарика
function dropBall() {
  const ball = Matter.Bodies.circle(150, 10, 10, { restitution: 0.5 });
  Matter.World.add(engine.world, ball);
}