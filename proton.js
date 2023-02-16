function Proton(position, noiseMax) {
  this.position = position;
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.noiseMax = noiseMax;
  this.mass = 20;
  this.phase = 0;

  this.display = function() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(255, map(noiseMax, 10, 0, 100, 255));
    beginShape();

    for (var angle = 0; angle < TWO_PI; angle += 0.01) {
      let xOffset = map(cos(angle + this.phase), -1, 1, 0, noiseMax);
      let yOffset = map(sin(angle), -1, 1, 0, noiseMax);
      let radius = map(noise(xOffset, yOffset), 0, 1, 30, 50);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    this.phase += 0.01;
  }

  this.attract = function attract(electron) {
    // Force between two objects
    var force = p5.Vector.sub(this.position, electron.position);
    // Direction and magnitude of the force
    var d = force.mag();
    force.normalize();
    // Magnitude of the force
    var strength = (this.mass * electron.mass) / (d * d);
    // Putting magnitude and direction together
    force.mult(strength);
    force.setMag(0.01);
    electron.applyForce(force);
  }
}
