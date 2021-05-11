const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;

var man;
var ground;

var maxDrops = 100;
var drops = [];
var thunder1, thunder2, thunder3;
var umbrella;
var thunder,
  Frame = 0;

function preload() {
  man = loadImage("./assets/img/man.png");
  thunder1 = loadImage("./assets/img/thunder1.png");
  thunder2 = loadImage("./assets/img/thunder2.png");
  thunder3 = loadImage("./assets/img/thunder3.png");
}

function setup() {
  var canvas = createCanvas(300, 500);
  engine = Engine.create();
  world = engine.world;
  umbrella = new Umbrella();

  if (frameCount % 10 === 0) {
    for (var i = 0; i < maxDrops; i++) {
      drops.push(new Drop(random(0, 500), random(0, 400), 3, 10));
    }
  }
}

function draw() {
  background(0);
  Engine.update(engine);

  var rand = Math.round(random(1, 2));
  if (frameCount % 80 === 0) {
    Frame = frameCount;
    thunder = createSprite(random(100, 250), random(10, 30), 10, 10);
    switch (rand) {
      case 1:
        thunder.addImage(thunder1);
        break;
      case 2:
        thunder.addImage(thunder2);
        break;
      case 3:
        thunder.addImage(thunder3);
        break;
      default:
        break;
    }
  }

  if (Frame + 20 === frameCount && thunder) {
    thunder.destroy();
  }

  umbrella.display();

  for (var i = 0; i < maxDrops; i++) {
    drops[i].display();
    drops[i].update();
  }

  drawSprites();
}
