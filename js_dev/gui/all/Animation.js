/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/11/2014
 */

/**
 * An Animation is a collection of frames for an animation.  Used in conjunction with
 * SpriteSheet which holds the image data for the animation.
 * @class Animation
 * @constructor
 * @param name          {String} a name for this animation
 * @param startingFrame {int}    the starting frame of the animation in terms of a {{#crossLink "SpriteSheet"}}{{/crossLink}}
 * @param endingFrame   {int}    the ending frame of the animations in terms of a {{#crossLink "SpriteSheet"}}{{/crossLink}}
 */
function Animation(name, startingFrame, endingFrame){
	this.name          = name;
	this.currentFrame  = startingFrame;
	this.startingFrame = startingFrame;
	this.endingFrame   = endingFrame;
}

Animation.prototype = {
	/**
	 * Returns the name of this animation.
	 * @method getName
	 * @return {String} the name of this animation
	 */
	getName: function(index){
		return this.name;
	},
	
	/**
	 * Returns the starting frame.
	 * @method getStartingFrame
	 * @return {int} the number of the starting frame
	 */
	getStartingFrame: function(){
		return this.startingFrame;
	},
	
	/**
	 * Return the ending frame.
	 * @method getEndingFrame
	 * @return {int} the number of the ending frame
	 */
	getEndingFrame: function(){
		return this.endingFrame;
	},
	
	/**
	 * Returns the current frame.
	 * @method getCurrentFrame
	 * @return {int} the number of the current frame
	 */
	getCurrentFrame: function(){
		return this.currentFrame;
	},
	
	/**
	 * Returns the frame count.
	 * @method getFrameCount
	 * @return {int} the number of frames in this animation
	 */
	 getFrameCount: function(){
		return this.endingFrame - this.startingFrame + 1;
	},
	
	/**
	 * Advances the current frame by one.  If the current frame goes past the end of the animation,
	 * the current frame loops to the beginning frame.
	 * @method advanceFrame
	 */
	advanceFrame: function(){
		this.currentFrame = this.currentFrame + 1;
		if (this.currentFrame > this.endingFrame){
			this.currentFrame = this.startingFrame;
		}
	},
	
	/**
	 * Regresses the current frame by one.  If the current frame goes past the beginning of the animation,
	 * the current frame loops to the ending frame.
	 * @method regressFrame
	 */
	regressFrame: function(){
		this.currentFrame = this.currentFrame - 1;
		if (this.currentFrame < this.startingFrame){
			this.currentFrame = this.endingFrame;
		}
	},
	
	/**
	 * Resets the current animation to the starting frame.
	 * @method resetAnimation
	 */
	 resetAnimation: function(){
		 this.currentFrame = this.startingFrame;
	 } 
};