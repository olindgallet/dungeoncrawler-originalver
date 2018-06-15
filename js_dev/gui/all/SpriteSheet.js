/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/10/2014
 */

/**
 * A SpriteSheet is used to hold data for a spritesheet 
 * and provide functions for getting individual images from it.
 * All sprites on the spritesheet are assumed to be the same dimension and are organized 
 * left to right.
 * @class SpriteSheet
 * @constructor
 * @param source    {String}        the source of the tile sheet
 * @param frameWidth  {int}         the width of a frame
 * @param frameHeight {int}         the height of a frame
 */
function SpriteSheet(source, frameWidth, frameHeight){
	this.source           = new createjs.Bitmap(source);
	this.frameWidth       = frameWidth;
	this.frameHeight      = frameHeight;
	this.frames           = [];
	
	var i = 0;
	while (i < this.frameWidth){
		this.frames[i] = this.source.clone();
		this.frames[i].sourceRect = new createjs.Rectangle(i * this.frameWidth, 0, this.frameWidth, this.frameHeight);
		i = i + 1;
	}
}

SpriteSheet.prototype = {
	/**
	 * Returns the specified frame.
	 * @method getFrame
	 * @param index {int} the index of the frame to get; the number is calculated based on the frame width and frame height, ie frame 0 = the frame at 0,0, frame 1 = the frame at frameWidth, 0, etc.
	 * @return {Bitmap} a copy of the specified frame.
	 */
	getFrame: function(index){
		return this.frames[index].clone();
	}
};