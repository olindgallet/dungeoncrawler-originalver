//https://github.com/kallaspriit/HTML5-JavaScript-Gamepad-Controller-Library

var XboxController = {
	faceButtons : {
		A: "FACE_1",
		B: "FACE_2",
		X: "FACE_3",
		Y: "FACE_4"
	},
	
	controlButtons: {
		START:  "START_FORWARD",
		SELECT: "SELECT_BACK"
	},
	
	shoulderButtons: {
		TOP_LEFT_SHOULDER:           "LEFT_TOP_SHOULDER",
		TOP_RIGHT_SHOULDER:         "RIGHT_TOP_SHOULDER",
		BOTTOM_LEFT_SHOULDER:   "LEFT_BOTTOM_SHOULDER",
		BOTTOM_RIGHT_SHOULDER: "RIGHT_BOTTOM_SHOULDER"
	},
	
	directionalPad: {
		UP:    "DPAD_UP",
		RIGHT: "DPAD_RIGHT",
		DOWN:  "DPAD_DOWN",
		LEFT:  "DPAD_LEFT"
	},
	
	joystick: {
		leftStick: {
			X: "LEFT_STICK_X",
			Y: "LEFT_STICK_Y"
		}, 
		rightStick: {
			X: "RIGHT_STICK_X",
			Y: "RIGHT_STICK_Y"
		}
	}
}

var gamepad = new Gamepad();
var gamepadStatus = {
	controlButtons: {
		start:  false,
		select: false
	},
	
	faceButtons:{
		a: false,
		b: false,
		x: false,
		y: false
	},
	
	shoulderButtons: {
		topLeftShoulder:     false,
		topRightShoulder:    false,
		bottomLeftShoulder:  false,
		bottomRightShoulder: false
	},
	
	directionalPad: {
		up:    false,
		right: false,
		down:  false,
		left:  false
	},
	
	joystick: {
		leftStick: {
			up: false,
			down: false,
			right: false,
			left: false
		}
	}
}

gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
});

gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
	// gamepad disconnected
});

gamepad.bind(Gamepad.Event.UNSUPPORTED, function(device) {
	// an unsupported gamepad connected (add new mapping)
});

gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
	// e.control of gamepad e.gamepad pressed down
	if (e.control === XboxController.faceButtons.A){
		gamepadStatus.faceButtons.a = true;
	} else if (e.control === XboxController.faceButtons.B){
		gamepadStatus.faceButtons.b = true;
	} else if (e.control === XboxController.directionalPad.LEFT){
		gamepadStatus.directionalPad.left  = true;
	} else if (e.control === XboxController.directionalPad.RIGHT){
		gamepadStatus.directionalPad.right = true;
	} else if (e.control === XboxController.directionalPad.UP){
		gamepadStatus.directionalPad.up = true;
	} else if (e.control === XboxController.directionalPad.DOWN){
		gamepadStatus.directionalPad.down  = true;
	} else if (e.control === XboxController.controlButtons.START){
		gamepadStatus.controlButtons.start = true;
	} else if (e.control === XboxController.shoulderButtons.TOP_LEFT_SHOULDER){
		gamepadStatus.shoulderButtons.topLeftShoulder = true;
	} else if (e.control === XboxController.shoulderButtons.TOP_RIGHT_SHOULDER){
		gamepadStatus.shoulderButtons.topRightShoulder = true;
	} else if (e.control === XboxController.shoulderButtons.BOTTOM_LEFT_SHOULDER){
		gamepadStatus.shoulderButtons.bottomLeftShoulder = true;
	} else if (e.control === XboxController.shoulderButtons.BOTTOM_RIGHT_SHOULDER){
		gamepadStatus.shoulderButtons.bottomRightShoulder = true;
	}
});

gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
	if (e.control === XboxController.directionalPad.UP){
		gamepadStatus.directionalPad.up = false;
	} else if (e.control === XboxController.directionalPad.DOWN){
		gamepadStatus.directionalPad.down  = false;
	} else if (e.control === XboxController.directionalPad.LEFT){
		gamepadStatus.directionalPad.left  = false;
	} else if (e.control === XboxController.directionalPad.RIGHT){
		gamepadStatus.directionalPad.right = false;
	} else if (e.control === XboxController.controlButtons.START){
		gamepadStatus.controlButtons.start = false;
	} else if (e.control === XboxController.faceButtons.A){
		gamepadStatus.faceButtons.a = false;
	} else if (e.control === XboxController.faceButtons.B){
		gamepadStatus.faceButtons.b = false;
	} else if (e.control === XboxController.shoulderButtons.TOP_LEFT_SHOULDER){
		gamepadStatus.shoulderButtons.topLeftShoulder = false;
	} else if (e.control === XboxController.shoulderButtons.TOP_RIGHT_SHOULDER){
		gamepadStatus.shoulderButtons.topRightShoulder = false;
	} else if (e.control === XboxController.shoulderButtons.BOTTOM_LEFT_SHOULDER){
		gamepadStatus.shoulderButtons.bottomLeftShoulder = false;
	} else if (e.control === XboxController.shoulderButtons.BOTTOM_RIGHT_SHOULDER){
		gamepadStatus.shoulderButtons.bottomRightShoulder = false;
	}
});

gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
	if (e.axis === XboxController.joystick.leftStick.X){
		gamepadStatus.joystick.leftStick.left   = e.value < -.9;
		gamepadStatus.joystick.leftStick.right = e.value > .9 ;
	} else if (e.axis === XboxController.joystick.leftStick.Y){
		gamepadStatus.joystick.leftStick.up         = e.value < -.9;
		gamepadStatus.joystick.leftStick.down  = e.value > .9;
	}
});

gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
	// gamepads were updated (around 60 times a second)
});

if (!gamepad.init()) {
	// Your browser does not support gamepads, get the latest Google Chrome or Firefox
}