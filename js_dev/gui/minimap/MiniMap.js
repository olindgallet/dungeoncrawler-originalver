/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/10/2014
 */

/**
 * A MiniMap is used to hold data for the minimap. 
 * and provide functions for getting individual images from it.
 * @class MiniMap
 * @constructor
 * @param gamemap {GameMap} the game map to display
 */
function MiniMap(gamemap){
	this._gamemap = [];
	this._width   = gamemap.getWidth();
	this._height  = gamemap.getHeight();
	this._spritesheet = new SpriteSheet(GraphicsConstants.spritesheets.minimap.URL, GraphicsConstants.spritesheets.minimap.TILE_WIDTH, GraphicsConstants.spritesheets.minimap.TILE_HEIGHT);
	
	var i = 0;
	while (i < gamemap.getRoomCount()){
		if (gamemap.getRoom(i) === null){
			this._gamemap[i] = this._spritesheet.getFrame(3);
		} else {
			switch(gamemap.getRoom(i).getID()){
				case 'ttob':
					this._gamemap[i] = this._spritesheet.getFrame(1);
					break;
					
				case 'ltor':
					this._gamemap[i] = this._spritesheet.getFrame(0);
					break;
					
				case 't-right':
					this._gamemap[i] = this._spritesheet.getFrame(9);
					break;
					
				case 't-down':
					this._gamemap[i] = this._spritesheet.getFrame(10);
					break;
					
				case 't-left':
					this._gamemap[i] = this._spritesheet.getFrame(11);
					break;
					
				case 't-up':
					this._gamemap[i] = this._spritesheet.getFrame(8);
					break;
					
				case 'bl-elbow':
					this._gamemap[i] = this._spritesheet.getFrame(4);
					break;
					
				case 'br-elbow':
					this._gamemap[i] = this._spritesheet.getFrame(5);
					break;
					
				case 'tr-elbow':
					this._gamemap[i] = this._spritesheet.getFrame(7);
					break;
					
				case 'tl-elbow':
					this._gamemap[i] = this._spritesheet.getFrame(6);
					break;
				
				case 'crossroads':
					this._gamemap[i] = this._spritesheet.getFrame(12);
					break;
					
				case 's-stub':
					this._gamemap[i] = this._spritesheet.getFrame(15);
					break;
					
				case 'e-stub':
					this._gamemap[i] = this._spritesheet.getFrame(16);
					break;
					
				case 'n-stub':
					this._gamemap[i] = this._spritesheet.getFrame(13);
					break;
					
				case 'w-stub':
					this._gamemap[i] = this._spritesheet.getFrame(14);
					break;
				
				default:
					//shouldn't happen
					break;
			}
		}
		i = i + 1;
	}
}

MiniMap.prototype = {
	/**
	 * Gets the width of the map in tiles.
	 * @function getWidth
	 * @return the map width in tiles
	 */
	getWidth: function(){
		return this._width;
	},
	
	/**
	 * Gets the height of the map in tiles.
	 * @function getHeight
	 * @return the map height in tiles
	 */
	 getHeight: function(){
		 return this._height;
	},
	
	getBlankTile: function(){
		return this._spritesheet.getFrame(3);
	},
	
	/**
	 * Gets the tile at the specified index.
	 * @function getTile
	 * @param index {int} the index of the map tile requested.
	 * @return an Image representing the minimap tile
	 */
	getTile: function(index){
		return this._gamemap[index].clone();
	}
		
};