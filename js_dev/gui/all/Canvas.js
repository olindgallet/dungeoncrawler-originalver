/**
 * @author Olin Gallet
 * @date     12/13/2015
 */
var Canvas = (function() {
	var stage;
	var layers;
	var width;
	var height;
	var _id;
	
    return {
		/**
		 * Adds a layer to this canvas.
		 * The given layer is equal to this.getLayerCount - 1.
		 */
       addLayer: function() {
            layers.push(new createjs.Container());
			stage.addChild(layers[layers.length - 1]);
        },
		
		/**
		 * Adds component to the given layer.
		 * @param layerNumber {int} the layer number, must be between 0 and getLayerCount - 1 inclusive
		 * @param component    {DisplayObject} the component to add
		 */
		addComponent: function(layerNumber, component){
			layers[layerNumber].addChild(component);
		},
		
		/**
		 * Removes all children from all layers.
		 */
		 clearAllLayers: function(){
			 var i = 0;
			 while (i < layers.length){
				 layers[i].removeAllChildren();
				 i = i + 1;
			 }
		 },
		
		/**
		 * Removes all children from the given layer, effectively
		 * clearing it upon update.
		 */
		clearLayer: function(layerNumber){
			layers[layerNumber].removeAllChildren();
		},
		
		/**
		 * Gets the height of this canvas in pixels.
		 */
		 getHeight: function(){
			 return stage.canvas.height;
		 }, 
		
		/**
		 * Gets the number of layers on this canvas.
		 */
		getLayerCount: function(){
			return layers.length;
		},
		
		/**
		 * Returns the id of the canvas.
		 */
		getName: function(){
			return _id;
		},
		
		/**
		 * Gets the width of this canvas in pixels.
		 */
		 getWidth: function(){
			 return stage.canvas.width;
		 },

		/**
		 * Hides the loading bar.
		 */
		hideLoadingBar: function(){
			layers[layers.length - 1].removeAllChildren();
			stage.update();
		},
		 
		/**
		  * Initializes the canvas.
		  * @param id {String}           the id of the canvas to use.
		  * @param layerCount {int} the number of layers to add, must be greater than 0.
		  */
		 init: function(id, width, height, layerCount){
			 stage = new createjs.Stage(id);
			 _id = id;
			 layers = [];
			 
			 var i = 0;
			 while (i < layerCount){
				this.addLayer();
				 i = i + 1;
			 }
			 
			stage.canvas.width  = width;
			stage.canvas.height = height;
		 },
		 
		 /**
		  * Scales the canvas  with the specified minimum width and height.
		  * @param minWidth  {int} the minimum width of the canvas
		  * @param minHeight {int} the minimum height of the canvas
		  */
		 scale: function(minWidth, minHeight){
			stage.canvas.width  = window.innerWidth;
			stage.canvas.height = window.innerHeight;
		
			var myRatio     = minWidth / minHeight;
			var windowRatio = stage.canvas.width / stage.canvas.height;
			
			if (myRatio > windowRatio) {
				stage.canvas.scaleX = stage.canvas.scaleY = stage.canvas.width / minWidth;
			} else {
				stage.canvas.scaleX = stage.canvas.scaleY = stage.canvas.height / minHeight;
			}
			stage.update();
		 },
		 
		 /**
		  * Shows the loading bar with the given percent.
		  */
		showLoadingBar: function(percent){
			var text = TextUtilities.makeText(0, 50, 'Loading: ' + percent + "%", 32, '#fff');
			
			Canvas.addComponent(layers.length - 1, text);
			stage.update();
		},
		
		/**
		 * Updates the canvas.
		 */
		 update: function(){
			 stage.update();
		 }
    };

})();