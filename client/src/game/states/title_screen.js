var Fader = require("../util/fader");

function TitleScreen() {};

var titleOffsetX = 55;
var titleOffsetY = 20;

var buttonOffsetX = 40;
var startButtonOffsetY = 275;
var howToButtonOffsetY = 360;

var bombermanOffsetX = 305;
var bombermanOffsetY = 265;

var firstBombOffsetX = bombermanOffsetX + 12;
var firstBombOffsetY = bombermanOffsetY + 57;

var secondBombOffsetX = bombermanOffsetX + 185;
var secondBombOffsetY = bombermanOffsetY + 141;


TitleScreen.prototype = {
	create: function() {
		this.showingInstructions = false;
		this.justClickedHowTo = false;
		this.justClickedOutOfHowTo = false;


		this.createButtons();

		var startButtonTween = this.createInitialButtonTween(this.startButton, 200);
		var howToButtonTween = this.createInitialButtonTween(this.howToButton, 400);

		// var title = game.add.image(titleOffsetX, titleOffsetY - 200, TEXTURES, "background1.png");
		var title = game.add.image(titleOffsetX, titleOffsetY - 200, TEXTURES, "background1.png");

		var titleTween = game.add.tween(title);
		titleTween.to({y: titleOffsetY}, 500, Phaser.Easing.Bounce.Out, true, 200).start();



		var bombermanTween = game.add.tween(bomberman).to({x: bombermanOffsetX}, 300, Phaser.Easing.Default, false, 100);
		bombermanTween.onComplete.addOnce(function() {
			bomberman.animations.play("bomb_animation");
		});

		bombermanTween.start();
		startButtonTween.start();
		howToButtonTween.start();
	},

	createInitialButtonTween: function(button, delay) {
		return game.add.tween(button).to({x: buttonOffsetX}, 300, Phaser.Easing.Default, false, delay);
	},



		// game.add.image(0, 0, TEXTURES, "titlescreen/background.png");


	createButtons: function() {
		this.startButton = game.add.button(buttonOffsetX - 250, startButtonOffsetY, TEXTURES, function() {
			if(!this.showingInstructions && !this.justClickedOutOfHowTo) {
				Fader.fadeOut(function() {
					game.state.start("Lobby");
				});
			}
		}, this, "titlescreen/buttons/startbutton_02.png", "titlescreen/buttons/startbutton_01.png");
		this.startButton.setDownSound(buttonClickSound);

		this.howToButton = game.add.button(buttonOffsetX - 250, howToButtonOffsetY, TEXTURES, function() {
			if(!this.showingInstructions && !this.justClickedOutOfHowTo) {
				this.showingInstructions = true;
				Fader.fadeOut(function() {
					this.howTo = game.add.image(0, 0, TEXTURES, "titlescreen/howtoplay.png");
					this.justClickedHowTo = true;
					Fader.fadeIn();
				}, this);
			}
		}, this, "titlescreen/buttons/howtobutton_02.png", "titlescreen/buttons/howtobutton_01.png");
		this.howToButton.setDownSound(buttonClickSound);
	},

	update: function() {
		if(!game.input.activePointer.isDown && this.justClickedHowTo) {
			this.justClickedHowTo = false;
		}

		if(!game.input.activePointer.isDown && this.justClickedOutOfHowTo) {
			this.justClickedOutOfHowTo = false;
		}

		if(game.input.activePointer.isDown && this.showingInstructions && !this.justClickedHowTo) {
			buttonClickSound.play();
			this.showingInstructions = false;
			this.justClickedOutOfHowTo = true;
			Fader.fadeOut(function() {
				this.howTo.destroy();
				Fader.fadeIn();
			}, this);
		}
	}
}

module.exports = TitleScreen;
