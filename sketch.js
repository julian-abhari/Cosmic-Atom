var increment = 0.05;
var gridScale = 20;
var columns;
var rows;
var zOffset = 0;

var flowField;
var protons = [];
var electrons = [];
var numberOfElectrons = 1000;

function setup() {
  pixelDensity(3);
  createCanvas(800, 600);
  columns = floor(width / gridScale);
  rows = floor(height / gridScale);
  flowField = new Array(rows * columns);

  protons[0] = new Proton(createVector((width / 2) - 25, height / 2), 8.7);
  protons[1] = new Proton(createVector((width / 2) + 25, height / 2), 8.7);
  protons[2] = new Proton(createVector(width / 2, height / 2), 2);

  perlinLace = new PerlinLace(createVector(width/2, height/2), 8.7);

  for (var i = 0; i < numberOfElectrons; i += 1) {
    var angle = map(i, 0, numberOfElectrons, 0, TWO_PI);
    var position = createVector(cos(angle)*random(100, 300) + width/2, sin(angle)*random(100, 300) + height/2);
    electrons[i] = new Electron(position);
  }
}

function draw() {
  background(0);
  var xOffset = 0;
  for (var x = 0; x < columns; x += 1) {
    var yOffset = 0;
    for (var y = 0; y < rows; y += 1) {
      var index = (x + y * columns);
      var angle = map(noise(xOffset, yOffset, zOffset), 0, 1, 0, TWO_PI * 3);
      var vector = p5.Vector.fromAngle(angle);
      vector.setMag(0.01);
      flowField[index] = vector;
      yOffset += increment;
    }
    xOffset += increment;
  }
  zOffset += 0.001;

  for (var i = 0; i < protons.length; i += 1) {
    protons[i].display();
  }
  for (var i = 0; i < electrons.length; i += 1) {
    electrons[i].display();
    electrons[i].update();
    electrons[i].edges();
    //electrons[i].follow(flowField);
    protons[2].attract(electrons[i]);
  }
  perlinLace.display();
}
