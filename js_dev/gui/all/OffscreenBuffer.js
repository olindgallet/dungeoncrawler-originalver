/**
 * @author Olin Gallet
 * @date   6/26/2017
 */
  	
/**
 * An OffscreenBuffer is a canvas for drawing offscreen.  Use it for image processing and the like.
 * @class OffscreenBuffer
 * @constructor
 * @param int width the width of the buffer
 * @param int height the height of the buffer
 */
function OffscreenBuffer(width, height){
	this.canvas        = document.createElement('canvas');
	this.canvas.width  = width;
	this.canvas.height = height;
}

OffscreenBuffer.prototype = {
	/**
	 * Clears the buffer.
	 */
	clearBuffer: function(){
		this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	
	/**
	 * Copies the canvas to this one.
	 * @param String id the id of the canvas
	 */
	copy: function(id) {
		var _source = document.getElementById(id);
		var context = _source.getContext('2d').getImageData(0, 0, _source.width, _source.height);
		this.canvas.getContext('2d').putImageData(context, 0, 0);
	},
	
	/**
	 * Gets the canvas for use.
	 */
	getCanvas: function() {
		return this.canvas;
	},
	
	/**
	 * Shifts a row to the left or right.
	 * @param int row the row number to shift.
	 * @param int degree how much to shift; if positive, shift right.  if negative, shift left.
	 */
	shiftRow: function(row, degree){
		var imageData = this.canvas.getContext('2d').getImageData(0, 0, this.canvas.width, this.canvas.height);
		var pix = imageData.data;
		var startingIndex = this.canvas.width * row * 4;
		var endingIndex   = this.canvas.width * (row + 1) * 4;
		var copy = pix.slice(startingIndex, endingIndex);
		var i = startingIndex;
		while (i < endingIndex){
			pix[i] = copy[copy.length - i - 4];
			pix[i + 1] = copy[copy.length - i - 3]; 
			pix[i + 2] = copy[copy.length - i - 2];
			pix[i + 3] = 255;
			i = i + 4;
		}
		this.canvas.getContext('2d').putImageData(imageData, 0, 0);
	}
}