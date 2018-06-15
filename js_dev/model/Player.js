/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   8/1/2017
 */

/**
 * A Player represents the player in the game.  
 * @param currentRoom {int} the current room number for the player
 */
function Player(currentRoom){
	this._currentRoomNumber = currentRoom;
	this._compass           = new Compass();
}

Player.prototype = {
	/**
	 * Gets the current room for the player.
	 * @function getCurrentRoomNumber
	 * @return the current room number for the player
	 */
	getCurrentRoom: function(){
		return this._currentRoomNumber;
	},
	
	/**
	 * Returns the direction the player is facing.
	 */
	getDirection: function(){
		return this._compass.getDirection();
	},
	
	/**
	 * Sets the current room for the player.
	 * @function setCurrentRoomNumber
	 * @param roomNumber {int} the room for the player
	 */
	setCurrentRoom: function(roomNumber){
		this._currentRoomNumber = roomNumber;
	},
	
	/**
	 * Turns the player left.
	 * @function turnPlayerLeft
	 */
	turnLeft: function(){
		this._compass.turnLeft();
	},
	
	
	/**
	 * Turns the player right.
	 */
	turnRight: function(){
		this._compass.turnRight();
	}
}