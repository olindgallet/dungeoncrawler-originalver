/**
 * Makes a new InputObserver.
 */
function InputObserver(){
	this.isAcceptingInput = true;
}

InputObserver.prototype.isStartPressed = function(){
	return gamepadStatus.controlButtons.start;
};

InputObserver.prototype.isActionPressed = function(){
	return gamepadStatus.faceButtons.a;
}

InputObserver.prototype.isUpPressed = function(){
	return gamepadStatus.directionalPad.up || gamepadStatus.joystick.leftStick.up;
}

InputObserver.prototype.isDownPressed = function(){
	return gamepadStatus.directionalPad.down || gamepadStatus.joystick.leftStick.down;
}

InputObserver.prototype.isLeftPressed = function(){
	return gamepadStatus.directionalPad.left || gamepadStatus.joystick.leftStick.left;
}

InputObserver.prototype.isRightPressed = function(){
	return gamepadStatus.directionalPad.right || gamepadStatus.joystick.leftStick.right;
}


InputObserver.prototype.resetState = function(){
	gamepadStatus.controlButtons.start      = false;
	gamepadStatus.directionalPad.down       = false;
	gamepadStatus.joystick.leftStick.up     = false;
	gamepadStatus.joystick.leftStick.down   = false;
	gamepadStatus.joystick.leftStick.left   = false;
	gamepadStatus.joystick.leftStick.right  = false;
}

/**
 * Handles the keyboard.
 */
var listener = new window.keypress.Listener();

listener.register_combo({
	"keys"	             : "up",
	"prevent_default"   : true,
	"on_keydown"  : function(){ gamepadStatus.directionalPad.up   = true; },
	"on_keyup"       : function(){ gamepadStatus.directionalPad.up = false;}
});

listener.register_combo({
	"keys"	             : "w",
	"prevent_default"   : true,
	"on_keydown"  : function(){ gamepadStatus.directionalPad.up   = true; },
	"on_keyup"       : function(){ gamepadStatus.directionalPad.up = false;}
});

listener.register_combo({
	"keys"	             : "down",
	"prevent_default"   : true,
	"on_keydown"  : function(){ gamepadStatus.directionalPad.down   = true; },
	"on_keyup"       : function(){ gamepadStatus.directionalPad.down = false;}
});

listener.register_combo({
	"keys"	             : "left",
	"prevent_default"   : true,
	"on_keydown"  : function(){ gamepadStatus.directionalPad.left   = true; },
	"on_keyup"       : function(){ gamepadStatus.directionalPad.left = false;}
});

listener.register_combo({
	"keys"	             : "right",
	"prevent_default"   : true,
	"on_keydown"  : function(){ gamepadStatus.directionalPad.right   = true; },
	"on_keyup"       : function(){ gamepadStatus.directionalPad.right = false;}
});

listener.register_combo({
	"keys"	             : "s",
	"prevent_default"   : true,
	"on_keydown"  : function(){ gamepadStatus.directionalPad.down   = true;  },
	"on_keyup"       : function(){ gamepadStatus.directionalPad.down = false;}
});

listener.register_combo({
	"keys"	             : "m",
	"prevent_default"   : true,
	"on_keydown"  : function(){ gamepadStatus.controlButtons.start = true;},
	"on_keyup"       : function(){ gamepadStatus.controlButtons.start = false;}
});

listener.register_combo({
	"keys"              : "space",
	"prevent_default"   : true,
	"on_keydown" : function(){ gamepadStatus.faceButtons.a = true; },
	"on_keyup"      : function(){ gamepadStatus.faceButtons.a = false; }
});