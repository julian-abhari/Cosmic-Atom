function Electron(position) {
  this.position = position || createVector(random(width), random(height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxSpeed = 2;
  this.mass = 1;
  this.radius = 1;

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.display = function() {
    fill(255, 150);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }

  this.follow = function(vectors) {
    var x = floor(this.position.x / gridScale);
    var y = floor(this.position.y / gridScale);
    var index = x + y * columns;
    var force = vectors[index];
    //force.setMag(0.008);
    if (force != null) {
      this.applyForce(force);
    }
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.edges = function() {
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
  }

}
