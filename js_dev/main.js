/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/13/2015
 */
/**
 * This is the main file, sets up the game and runs the playscreen loop.
 */
Canvas.init(GraphicsConstants.CANVAS, GraphicsConstants.dimensions.WIDTH, GraphicsConstants.dimensions.HEIGHT, GraphicsConstants.LAYER_COUNT);

AssetLoader.load(function(){
	createjs.Ticker.setFPS(GraphicsConstants.FPS);
	AudioPlayer.init();
	GameState.reset();
	FrameTimer.init(GraphicsConstants.FPS);
	
	PlayScreen.load();
	PlayScreen.render();
	
	setTimeout(function(){
		Canvas.update();
		createjs.Ticker.addEventListener("tick", function(){ PlayScreen.update(); });
	}, 100);
});
