/**
 * An FrameTimer is used to keep track of frames.
 * Using this since I don't want to use CreateJS's since it
 * can't be reset too easily.
 *
 * @author Olin Gallet
 * @date    10/7/2015
 */
var FrameTimer = (function() {
	var frames                   = 0;
	var maxFrame            = 0;
	var continuousEvents = [];
	var delayedEvents      = [];
	
	return {
		/**
		 * Adds an event to execute for a certain number of frames.
		 * @param id                  {String} an identifier for the event
		 * @param frames         {int} the number of frames to execute
		 * @param func              {function} the function to execute each frame
		 * @param onComplete {function} the callback to call after the specified number of frames, if any
		 */
		addContinuousEvent: function(id, frames, func, onComplete){
			onComplete = null;
			continuousEvents.push({ id: id, frames: frames, currentFrames: 0, func: func, onComplete: onComplete});
		},
		
		/**
		 * Adds an event to execute after a certain number of frames.
		 * @param id                  {String}    an identifier for the event
		 * @param frames         {int}          the number of frames to wait
		 * @param onComplete {function} the callback to call after the specified numbers of frames
		 */
		addDelayedEvent: function(id, frames, onComplete){
			delayedEvents.push({ id: id, frames: frames, currentFrames: 0, onComplete: onComplete});
		},
		
		/**
		 * Advances the frame by 1.
		 * If the frame reaches the maximum frame, then it resets to 0.
		 * @function advanceFrame
		 */
		advanceFrame: function(){
			frames = frames + 1;
			
			var i = 0;
			while (i < delayedEvents.length){
				 delayedEvents[i].currentFrames = delayedEvents[i].currentFrames + 1;
				 if (delayedEvents[i].currentFrames >= delayedEvents[i].frames){
					 if (delayedEvents[i].onComplete !== null && delayedEvents[i].onComplete !== undefined){
						delayedEvents[i].onComplete.call();
					 }
					 delayedEvents.splice(i, 1);
				 }
				 i = i + 1;
			}
			
			i = 0;
			while (i < continuousEvents.length){
				continuousEvents[i].func.call();
				continuousEvents[i].currentFrames = continuousEvents[i].currentFrames + 1;
				if (continuousEvents[i].currentFrames >= continuousEvents[i].frames){
					if (delayedEvents[i].onComplete !== null && delayedEvents[i].onComplete !== undefined){
						continuousEvents[i].onComplete.call();
					}
					continuousEvents.splice(i, 1);
				}
				i = i + 1;
			}
			
			if (frames >= maxFrame){
				frames = 0;
			}
		},
		
		/**
		 * Checks if the given continuous event is in the list.
		 * @param id {String} the identifier for the event
		 */
		 containsContinuousEvent: function(id){
			 var response = false;
			 var i = 0;
			 
			 while (!response && i < continuousEvents.length){
				 response = continuousEvents[i].id === id;
				 i = i + 1;
			 }
			 
			 return response;
		 },
		
		/**
		 * Checks if the given delayed event is in the list.
		 * @param id {String} the identifier for the event
		 */
		containsDelayedEvent: function(id){
			var response = false;
			var i = 0;
			
			while (!response && i < delayedEvents.length){
				response = delayedEvents[i].id === id;
				i = i + 1;
			}
			
			return response;
		},
		
		/**
		 * Returns the current frame.
		 * @function getCurrentFrame
		 */
		getCurrentFrame: function(){
			return frames;
		},
		
		/**
		 * Initializes the FrameTimer.
		 * @param maxFrame_ {int} the maximum value to count to
		 * @function init
		 */
		 init: function(maxFrame_){
			maxFrame = maxFrame_;
		 },
		 
		 /**
		  * Returns if the current frame is the last frame before resetting.
		  * @function isLastFrame
		  */
		 isLastFrame: function(){
			 return frames === maxFrame - 1;
		 }
    };
})();