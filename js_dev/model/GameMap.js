/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   8/1/2017
 */

/**
 * A GameMap is a dungeon map that a player can move around and interact in.  It
 * is made from loading up a JSON file exported from Tiled.
 */
function GameMap(){
	this._rooms  = [];
	this._width  = 0;
	this._height = 0;
	this._startingRoom = 0;
}

GameMap.prototype = {
	/**
	 * Gives the height of this map (0 if !this.hasMap).
	 * @function getHeight
	 * @return the height of this map (0 if !this.hasMap)
	 */
	getHeight: function() {
		return this._height;
	},
	
	/**
	 * Gives the room located at the specified index.
	 * @function getRoom
	 * @param index {int} the index of the room, must be 0 <= index < this.getWidth() * this.getHeight()
	 * @return the Room if there is one present, null if not
	 */
	 getRoom: function(index){
		 return this._rooms[index];
	 },
	 
	 /**
	  * Gives the number of rooms in this map.
	  * @function getRoomCount
	  * @return the number of rooms in this map
	  */
	getRoomCount: function(){
		return this._rooms.length;
	},
	
	/**
	 * Gives the starting room on this map.
	 * @function getStartingRoom
	 * @return the starting room on this map
	 */
	getStartingRoom: function(){
		return this._startingRoom;
	},
	
	/**
	 * Gives the width of this map (0 if !this.hasMap)
	 * @function getWidth
	 * @return the width of this map (0 if !this.hasMap)
	 */
	getWidth: function() {
		return this._width;
	},
	
	/**
	 * States if this GameMap has a map loaded or not.
	 * @function hasMap
	 * @return true if there is a map loaded, false if none
	 */
	hasMap: function(){
		return this._rooms === [];
	},
	
	/**
	 * Loads the map.
	 * @function filename the filename of the JSON map to use.
	 * @throw {String} a message containing the filename unable to be loaded.
	 */
	loadMap: function(filename){
		var json = JSONUtilities.loadJSON(filename);
		if (json !== null){
			var data = JSON.parse(json);
			var map, interactive, interactiveData, noninteractive, noninteractiveData, warp, mapOffset, interactiveOffset, noninteractiveOffset;
			
			this._width  = data['width'];
			this._height = data['height'];
			
			data['layers'].forEach(function(element){
				if(element['name'] === 'Map'){
					map = element['data'];
				} else if (element['name'] === 'Interactive'){
					interactive = element['data'];
				} else if (element['name'] === 'Warp'){
					warp = element['data'];
				} else if (element['name'] === 'Noninteractive'){
					noninteractive = element['data'];
				}
			});
			
			data['tilesets'].forEach(function(element){
				if(element['name'] === 'Map Pieces'){
					mapOffset = element['firstgid'];
				} else if (element['name'] === 'Interactive Pieces'){
					interactiveOffset = element['firstgid'];
					interactiveData = element['tileproperties'];
				} else if (element['name'] === 'Noninteractive Pieces'){
					noninteractiveOffset = element['firstgid'];
					noninteractiveData = element['tileproperties'];
				}
			});
			
			var i = 0;
			var interactiveItem;
			var noninteractiveItem;
			while (i < map.length){
				if (interactiveData[(interactive[i] - interactiveOffset).toString()] !== undefined){
					interactiveItem = { id: interactiveData[(interactive[i] - interactiveOffset)]['id'], type: interactiveData[(interactive[i] - interactiveOffset)]['type'] };
				} else {
					interactiveItem = null;
				}
				
				if (noninteractiveData[(noninteractive[i] - noninteractiveOffset).toString()] !== undefined){
					noninteractiveItem = { id: noninteractiveData[(noninteractive[i] - noninteractiveOffset)]['id'], type: noninteractiveData[(noninteractive[i] - noninteractiveOffset)]['type'] };
				} else {
					noninteractiveItem = null;
				}
				switch(map[i] - mapOffset){
					case 0:
					  //ttob
					  this._rooms[i] = new Room("ttob", i - this._width, null, i + this._width, null, interactiveItem, noninteractiveItem);					  
					  break;
				
					case 1:
					  //ltor
					  this._rooms[i] = new Room("ltor", null, i + 1, null, i - 1, interactiveItem, noninteractiveItem);
					  break;
						  
					case 8: 
					  //t-right
					  this._rooms[i] = new Room("t-right", i - this._width, i + 1, i + this._width, null, interactiveItem, noninteractiveItem);
					  break;
						  
					case 9:
					  //t-down
					  this._rooms[i] = new Room("t-down", null, i + 1, i + this._width, i - 1, interactiveItem, noninteractiveItem);
					  break;
				
					case 10:
					  //t-left
					  this._rooms[i] = new Room("t-left", i - this._width, null, i + this._width, i - 1, interactiveItem, noninteractiveItem);
					  break;
						  
					case 11:
					  //t-up
					  this._rooms[i] = new Room("t-up", i - this._width, i + 1, null, i - 1, interactiveItem, noninteractiveItem);
					  break;
					  
					case 12:
					  //crossroads
					  this._rooms[i] = new Room("crossroads", i - this._width, i + 1, i + this._width, i - 1, interactiveItem, noninteractiveItem);
					  break;
						  
					case 16:
					  //bl-elbow
					  this._rooms[i] = new Room("bl-elbow", i - this._width, i + 1, null, null, interactiveItem, noninteractiveItem);
					  break;
						  
					case 17:
					  //br-elbow
					  this._rooms[i] = new Room("br-elbow", i - this._width, null, null, i - 1, interactiveItem, noninteractiveItem);
					  break;
						  
					case 18:
					  //tr-elbow
					  this._rooms[i] = new Room("tr-elbow", null, null, i + this._width, i - 1, interactiveItem, noninteractiveItem);
					  break;
						  
					case 19:
					  //tl-elbow
					  this._rooms[i] = new Room("tl-elbow", null, i + 1, i + this._width, null, interactiveItem, noninteractiveItem);
					  break;
					  
					case 24:
					  //n-stub
					  this._rooms[i] = new Room("s-stub", i - this._width, null, null, null, interactiveItem, noninteractiveItem);
					  break;
					
					case 25:
					  //e-stub
					  this._rooms[i] = new Room("e-stub", null, i + 1 , null, null, interactiveItem, noninteractiveItem);
					  break;
					
					case 26:
					  //s-stub
					  this._rooms[i] = new Room("n-stub", null, null, i + this._width, null, interactiveItem, noninteractiveItem);
					  break;
					
					case 27:
					  //w-stub
					  this._rooms[i] = new Room("w-stub", null, null, null, i - 1, interactiveItem, noninteractiveItem);
					  break;
						 				  	  
					default:
					  this._rooms[i] = null;
					  break;
				}
				i = i + 1;
			}
			
			i = 0;
			
			while (i < warp.length){
				if (warp[i] - mapOffset === 32){
					this._startingRoom = i;
					i = warp.length;
				}
				i = i + 1;
			}
		} else {
			throw "could not load filename: " + filename;
		}
	}
};