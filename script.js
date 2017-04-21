'use strict';
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var smiley;
var cursors;
var stars;
var scoreText;

var score;

function preload() {
	game.load.image('smiley', 'smiley.png');
	game.load.image('star', 'star.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	smiley = game.add.sprite(400, 300, 'smiley');
	game.physics.arcade.enable(smiley);
	smiley.body.bounce.y = 0.5;
	smiley.body.bounce.x = 0.4;
	smiley.body.gravity.y = 1800;
	smiley.body.collideWorldBounds = true;

	cursors = game.input.keyboard.createCursorKeys();

	stars = game.add.group();
	game.time.events.loop(Phaser.Timer.SECOND, spawnStar, this);

	scoreText = game.add.text(0, 0, '', {font: '20px sans', fill: '#fff', boundsAlignH: 'left', boundsAlignV: 'top'});
	score = 0;
	updateScoreText();
}

function update() {
	if (cursors.left.isDown) {
		smiley.body.velocity.x -= 50;
	}
	if (cursors.right.isDown) {
		smiley.body.velocity.x += 50;
	}

	if (cursors.up.isDown && smiley.body.onFloor()) {
		smiley.body.velocity.y -= 800;
	}

	game.physics.arcade.overlap(smiley, stars, onCollideSmileyStar, null, this);
}

function spawnStar() {
	if (stars.total >= 4) {
		return;
	}

	var star = game.add.sprite(
		game.rnd.between(game.world.bounds.left, game.world.bounds.right),
		game.rnd.between(game.world.bounds.top, game.world.bounds.bottom),
		'star');
	game.physics.arcade.enable(star);
	stars.add(star);
}

function onCollideSmileyStar(unused, star) {
	stars.remove(star);
	score++;
	updateScoreText();
}

function updateScoreText() {
	scoreText.text = "Score: " + score;
}