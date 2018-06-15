/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/6/2015
 */

/**
 * The AssetLoader loads up all assets through the preloader to ensure the game
 * runs smoothly.
 */
var AssetLoader = (function() {
	return {	
		/**
		 * Loads all assets.
		 * @param onComplete the callback to use once assets are loaded.
		 * @function load
		 */
		load: function(onComplete){
			var preloader = new createjs.LoadQueue();
			preloader.addEventListener("complete", onComplete);
			
			Canvas.showLoadingBar(0);
			preloader.loadFile(AudioConstants.musicfiles.CANAL);
			preloader.loadFile(DataConstants.maps.DEMO);
			preloader.loadFile(DataConstants.text.INTERACTIVE);
			
			preloader.loadFile(GraphicsConstants.textbox.IMG);
			preloader.loadFile(GraphicsConstants.compass.IMG);
			
			Canvas.hideLoadingBar();
			Canvas.showLoadingBar(20);
			preloader.loadFile(GraphicsConstants.fonts.DIR + GraphicsConstants.fonts.arcade.EOT);
			preloader.loadFile(GraphicsConstants.fonts.DIR + GraphicsConstants.fonts.arcade.SVG);
			preloader.loadFile(GraphicsConstants.fonts.DIR + GraphicsConstants.fonts.arcade.TTF);
			preloader.loadFile(GraphicsConstants.fonts.DIR + GraphicsConstants.fonts.arcade.WOFF);
			preloader.loadFile(GraphicsConstants.fonts.DIR + GraphicsConstants.fonts.arcade.WOFF2);
			
			Canvas.hideLoadingBar();
			Canvas.showLoadingBar(40);
			preloader.loadFile(GraphicsConstants.bg.bottom.GRASSY_STRAIGHT);
			preloader.loadFile(GraphicsConstants.bg.bottom.GRASSY_RIGHT);
			preloader.loadFile(GraphicsConstants.bg.bottom.GRASSY_T_RIGHT);
			preloader.loadFile(GraphicsConstants.bg.bottom.GRASSY_T_LEFT);
			preloader.loadFile(GraphicsConstants.bg.bottom.GRASSY_T_UP);
			preloader.loadFile(GraphicsConstants.bg.bottom.PATH_LEFTRIGHT);
			
			Canvas.hideLoadingBar();
			Canvas.showLoadingBar(60);
			
			preloader.loadFile(GraphicsConstants.bg.middle.GRASSY_STRAIGHT);
			preloader.loadFile(GraphicsConstants.bg.middle.GRASSY_ELBOW_LEFT);
			preloader.loadFile(GraphicsConstants.bg.middle.GRASSY_ELBOW_RIGHT);
			preloader.loadFile(GraphicsConstants.bg.middle.GRASSY_T_DOWN);
			preloader.loadFile(GraphicsConstants.bg.middle.GRASSY_T_RIGHT);
			preloader.loadFile(GraphicsConstants.bg.middle.GRASSY_T_LEFT);
			preloader.loadFile(GraphicsConstants.bg.middle.GRASSY);
			preloader.loadFile(GraphicsConstants.bg.middle.GRASSY_STUB);
			
			Canvas.hideLoadingBar();
			Canvas.showLoadingBar(80);
			preloader.loadFile(GraphicsConstants.bg.top.OUTSIDE_SKY);
			
			preloader.loadFile(GraphicsConstants.objects.movie.IMG);
			
			preloader.loadFile(GraphicsConstants.spritesheets.minimap.URL);	
			preloader.loadFile(GraphicsConstants.minimap.frame.IMG);
			
			preloader.loadFile(GraphicsConstants.minimap.icons.npc.IMG);
			preloader.loadFile(GraphicsConstants.minimap.icons.video.IMG);
			
			preloader.loadFile(GraphicsConstants.fullmap.border.IMG);
			
			preloader.loadFile(GraphicsConstants.minimap.icons.video.IMG);
			
			preloader.loadFile(GraphicsConstants.
			
			Canvas.hideLoadingBar();
			Canvas.showLoadingBar(100);
		}
    };
})();