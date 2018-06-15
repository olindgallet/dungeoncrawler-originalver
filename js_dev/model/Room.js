/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   8/2/2017
 */

/**
 * A Room represents a room on a game map.  It can have up to 4 exits with a minimum of 1 exit.
 * Rooms also contain information about any enemies and/or interactible objects within it.
 */
 
function Room(roomID, northExitID, eastExitID, southExitID, westExitID, interactive, noninteractive){
	this._roomID         = roomID;
	this._northExitID    = northExitID;
	this._eastExitID     = eastExitID;
	this._southExitID    = southExitID;
	this._westExitID     = westExitID;
	this._interactive    = interactive;
	this._noninteractive = noninteractive;
}

Room.prototype = {
	/**
	 * Returns the ID of this room.
	 * @method getID
	 * @return {String} the ID of this room.
	 */
	getID: function(){
		return this._roomID;
	},
	
	/**
	 * Returns the ID of the north exit or null if there is none.
	 * @method getNorthExitID
	 * @return {String} the id of the north exit or null if there is none
	 */
	getNorthExitID: function(){
		return this._northExitID;
	},
	
	/**
	 * Returns the ID of the east exit or null if there is none.
	 * @method getEastExitID
	 * @return {String} the id of the east exit or null if there is none
	 */
	getEastExitID: function(){
		return this._eastExitID;
	},
	
	/**
	 * Returns the ID of the south exit or null if there is none.
	 * @method getSouthExitID
	 * @return {String} the ID of the south exit or null if there is none
	 */
	getSouthExitID: function(){
		return this._southExitID;
	},
	
	/**
	 * Returns the ID of the west exit or null if there is none.
	 * @method getWestExitID
	 * @return {String} the ID of the west exit or null if there is none
	 */
	getWestExitID: function(){
		return this._westExitID;
	},
	
	/**
	 * Returns the ID of the interactive or null if there is none.
	 * @method getInteractiveID
	 * @return {String} the ID of the interactive or null if there is none
	 */
	getInteractiveID: function(){
		return this._interactive.id;
	},
	
	/**
	 * Returns teh ID of the noninteractive or null if there is none.
	 * @method getNoninteractiveID: 
	 * @return {String} the ID of the noninteractive or null if there is none
	 */
	getNoninteractiveID: function(){
		 return this._noninteractive.id;
	},  
	
	/**
	 * Returns the type of the interactive or null if there is none.
	 * @method getInteractiveType
	 * @return {String} the type of the itneractive or null if there is none
	 */
	 getInteractiveType: function(){
		 return this._interactive.type;
	 },
	 
	/**
	 * Returns the type of the interactive or null if there is none.
	 * @method getInteractiveType
	 * @return {String} the type of the itneractive or null if there is none
	 */
	 getNoninteractiveType: function(){
		 return this._noninteractive.type;
	 },
	
	/**
	 * @method hasNorhtExit
	 * @return {boolean} true if there is a north exit, false if not
	 */
	hasNorthExit: function(){
		return this._northExitID !== null;
	},
	
	/**
	 * Returns if there is an east exit.
	 * @method hasEastExit
	 * @return {boolean} true if there is an east exit, false if not
	 */
	hasEastExit: function(){
		return this._eastExitID !== null;
	}, 
	
	/**
	 * Returns if there is a south exit.
	 * @method hasSouthExit
	 * @return {boolean} true if there is a south exit, false if not
	 */
	hasSouthExit: function(){
		return this._southExitID !== null;
	}, 
	
	/**
	 * Returns if there is a west exit.
	 * @method hasWestExit
	 * @return {boolean} true if there is a west exit, false if not
	 */
	hasWestExit: function(){
		return this._westExitID !== null;
	},
	
	/**
	 * @method hasInteractive
	 * @return {boolean} true if there is an interactive item, false if not
	 */
	hasInteractive: function(){
		return this._interactive !== null;
	},
	
	/**
	 * @method hasNoninteractive
	 * @return {boolean} true if there is an noninteractive item, false if not
	 */
	hasNoninteractive: function(){
		return this._noninteractive !== null;
	},
};