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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var allEnemies = [
    new Enemy(2 * Constants.sizeX, 1 * Constants.sizeY, 300),
    new Enemy(2 * Constants.sizeX, 2 * Constants.sizeY, 100),
    new Enemy(2 * Constants.sizeX, 3 * Constants.sizeY, 200),
];

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
