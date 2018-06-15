/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   10/15/2017
 */

/**
 * A Compass contains information about what direction the character is facing.
 */
 
function Compass(){
	this._direction = "north";
}

Compass.prototype = {
	/**
	 * Returns the direction facing.
	 * @method getDirection
	 * @return {String} the direction the player is facing
	 */
	getDirection: function(){
		return this._direction;
	},
	
	/**
	 * Turns the compass left.
	 */
	turnLeft: function(){
		switch (this._direction){
			case 'north':
				this._direction = "west";
				break;
				
			case 'west':
				this._direction = "south";
				break;
				
			case 'south':
				this._direction = "east";
				break;
				
			case 'east':
				this._direction = "north";
				break;
		}
	},
	
	/**
	 * Turns the compass right.
	 */
	turnRight: function(){
		switch (this._direction){
			case 'north':
				this._direction = "east";
				break;
				
			case 'west':
				this._direction = "north";
				break;
				
			case 'south':
				this._direction  = "west";
				break;
			
			case 'east':
				this._direction = "south";
				break;
		}
	}
}
	