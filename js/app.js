var Constants = {
    sizeX: 101, // size in pixels of each column
    sizeY: 83, // size in pixels of each row
    maxPosX: 4, // max column value (0 based)
    maxPosY: 5 // max row value (0 based)
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    // If enemy is off screen
    if (this.x > Constants.sizeX * (Constants.maxPosX + 1)) {
        this.x = - Constants.sizeX; // Resets position to the left
        this.y = Constants.sizeY * Math.floor((Math.random() * 3) + 1); // Redefines y position, generates random number between 1 and 3
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x - 2, this.y - 20);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function() {
    // Checks if player's current position is in the winning area (top row)
    if (this.y < Constants.sizeY) {
        alert("WIN");
        this.reset();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 10);
};

Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === 'left') {
        if (this.x > 0) {
            this.x -= Constants.sizeX;
        }
    } else if (keyPressed === 'up') {
        if (this.y > 0) {
            this.y -= Constants.sizeY;
        }
    } else if (keyPressed === 'right') {
        if (this.x < Constants.maxPosX * Constants.sizeX) {
            this.x += Constants.sizeX;
        }
    } else if (keyPressed === 'down') {
        if (this.y < Constants.maxPosY * Constants.sizeY) {
            this.y += Constants.sizeY;
        }
    }
};

// Resets player position to initial state (center column, first row)
Player.prototype.reset = function() {
    this.x = 2 * Constants.sizeX;
    this.y = 5 * Constants.sizeY;
};

var allEnemies = [
    new Enemy(2 * Constants.sizeX, 1 * Constants.sizeY, 300),
    new Enemy(2 * Constants.sizeX, 2 * Constants.sizeY, 100),
    new Enemy(2 * Constants.sizeX, 3 * Constants.sizeY, 200),
];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
