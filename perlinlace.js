function PerlinLace(position, noiseMax) {
  this.position = position;
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.noiseMax = noiseMax;
  this.mass = 20;
  this.orbRadius = 1;
  this.phase = 0;
  this.zOffset = 0;

  this.display = function() {
    push();
    translate(this.position.x, this.position.y);
    stroke(255, 140);
    for (var angle = (1 / 200 * PI); angle < TWO_PI; angle += (1 / 200 * PI)) {
      let xOffset = map(cos(angle + this.phase), -1, 1, 0, noiseMax);
      let yOffset = map(sin(angle + this.phase), -1, 1, 0, noiseMax);
      let radius = map(noise(xOffset, yOffset, zOffset), 0, 1, 200, 250);
      //let radius = 200
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      line(x, y, 0, 0);
    }
    zOffset += 0.01;
    pop();
    this.phase += 0.01;
  }

  this.attract = function attract(magneticFlux) {
    // Force between two objects
    var force = p5.Vector.sub(this.position, magneticFlux.position);
    // Direction and magnitude of the force
    var d = force.mag();
    force.normalize();
    // Magnitude of the force
    var strength = (this.mass * magneticFlux.mass) / (d * d);
    // Putting magnitude and direction together
    force.mult(strength);
    force.setMag(0.01);
    magneticFlux.applyForce(force);
  }
}
