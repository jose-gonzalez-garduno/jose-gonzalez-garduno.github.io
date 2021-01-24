var PLAYER_SCORE = 0;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    this.sprite = 'images/enemy-bug.png';

    //x and y coordinates
    this.x = x;
    this.y = y;

    //speed of enemies that are random
    this.speed = Math.floor((Math.random() * 400) + 200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x <= 505) { //canvas.width = 505
        this.x = this.x + this.speed * dt;
    } else {
        //get off screen?
        this.x = -2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/turtle.png';
    //Start Off point
    this.x = 202;
    this.y = 564;
};
function total_score() {
    PLAYER_SCORE += 10;
}
Player.prototype.update = function(dt) {

    var self = this;
    //When left key is pressed
    if (this.pressedKey === 'left' && this.x > 0) {
        //player isn't on left edge
        this.x = this.x - 101;
        // var image = new Image();
        // 	image.src = this.sprite.toDataURL("images/Star.png");
        // 	return image;

    }

    //When right key is pressed
    if (this.pressedKey === 'right' && this.x < 404) {
        //player isn't on right edge
        this.x = this.x + 101;
    }

    //When up key is pressed
    if (this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 86;
    }

    //When down key is pressed
    if (this.pressedKey === 'down' && this.y < 564) {
        this.y = this.y + 86;
    }

    //Move once when any key is pressed
    this.pressedKey = null;

    //if player reaches water, position reset:
    if (this.y < 0) {
        this.reset();

        total_score();
        document.getElementById('score').innerHTML = PLAYER_SCORE;
    }

    allEnemies.forEach(function(enemy) {
        if (self.x >= enemy.x - 25 && self.x <= enemy.x + 25) {
            if (self.y >= enemy.y - 25 && self.y <= enemy.y + 25) {
                self.reset();
            }
        }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method for player
Player.prototype.handleInput = function(e) {
    this.pressedKey = e;
};

//Reset player to beginning position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 564;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Instantiation of enemies and player objects:
var allEnemies = []; //creates an array of Enemies

//this function will DISPLAY Enemies:
(function displayEnemies() {
    //  allEnemies.push(new Enemy(0, 50));
    // allEnemies.push(new Enemy(0, 478));
    allEnemies.push(new Enemy(0, 478));
    allEnemies.push(new Enemy(0, 312));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 226));
}());

// Place the player object in a variable called player

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
