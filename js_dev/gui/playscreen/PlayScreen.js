var PlayScreen = (function() {
	var gamemap;
	var interactiveData;
	var minimap;
	var player;
	
	return {
		_clearDrawingLayers: function(){
			Canvas.clearLayer(GraphicsConstants.layers.BG_TOP);
			Canvas.clearLayer(GraphicsConstants.layers.BG_MIDDLE);
			Canvas.clearLayer(GraphicsConstants.layers.BG_BOTTOM);
			Canvas.clearLayer(GraphicsConstants.layers.INTERACTIVE);
			Canvas.clearLayer(GraphicsConstants.layers.TEXT);
			Canvas.clearLayer(GraphicsConstants.layers.TEXTBOX);
			Canvas.clearLayer(GraphicsConstants.layers.MINIMAP);
			Canvas.clearLayer(GraphicsConstants.layers.COMPASS);
		},
		
		_drawInteractive: function(){
			var type = gamemap.getRoom(player.getCurrentRoom()).getInteractiveType();
			
			if (type === 'npc'){
				Canvas.clearLayer(GraphicsConstants.layers.TEXT);
				PlayScreenDrawer.drawNPCShadow(interactiveData.getNPCName(gamemap.getRoom(player.getCurrentRoom()).getInteractiveID()));
			} else if (type === 'video'){
				Canvas.clearLayer(GraphicsConstants.layers.TEXT);
				PlayScreenDrawer.drawVideoShadow(interactiveData.getVideoTitle(gamemap.getRoom(player.getCurrentRoom()).getInteractiveID()), interactiveData.getVideoAuthor(gamemap.getRoom(player.getCurrentRoom()).getInteractiveID()));
			}
		},
		
		_drawNoninteractive: function(){
			var type = gamemap.getRoom(player.getCurrentRoom()).getNoninteractiveType();
			
			if (type === 'banner'){
				Canvas.clearLayer(GraphicsConstants.layers.BANNER);
				PlayScreenDrawer.drawBanner(gamemap.getRoom(player.getCurrentRoom()).getNoninteractiveID());
			} else if (type === 'music'){
				createjs.Sound.stop();
				createjs.Sound.play(AudioConstants.musicids.CANAL);
			}
		},
		
		/**
		 * Load the playscreen.
		 */
		load: function(){
			gamemap = new GameMap();
			interactiveData = new InteractiveData();
			try {
				gamemap.loadMap(DataConstants.maps.WORLDS_UNFAIR);
				interactiveData.loadData(DataConstants.text.INTERACTIVE);
			} catch (e) {
				alert('error:' + e);
			}
			if (gamemap !== null){
				minimap = new MiniMap(gamemap);
				player  = new Player(gamemap.getStartingRoom());
			}
			
			PlayScreenDrawer.prerender(interactiveData);
		},
		
		/**
		 * Render the game initially.
		 */
		render: function(){		
			vex.defaultOptions.className = 'vex-theme-flat-attack'
			
			PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
			PlayScreenDrawer.drawCompass(player.getDirection());
			PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
			PlayScreenDrawer.toggleHelpPanel();
			Canvas.update();
		},
		
		/**
		 * Unloads the playscreen
		 */
		unload: function(){
		},
		
		/**
		 * Updates the playscreen.
		 * Can be looped continually.
		 */
		update: function(){
			if (FrameTimer.getCurrentFrame() % 5 === 0 && GameControls.getPlayer1().isAcceptingInput){
				if (GameControls.getPlayer1().isUpPressed()){
					
					if (player.getDirection() === "north" && gamemap.getRoom(player.getCurrentRoom()).hasNorthExit()){
						this._clearDrawingLayers();
						player.setCurrentRoom(player.getCurrentRoom() - gamemap.getWidth());
						PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
						
						if (!PlayScreenDrawer.isFullMapShowing){
							PlayScreenDrawer.drawCompass(player.getDirection());
							PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						} else {
							PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
						}
					} else if (player.getDirection() === "east" && gamemap.getRoom(player.getCurrentRoom()).hasEastExit()){
						this._clearDrawingLayers();
						player.setCurrentRoom(player.getCurrentRoom() + 1);
						PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
						PlayScreenDrawer.drawCompass(player.getDirection());
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						
						if (!PlayScreenDrawer.isFullMapShowing){
							PlayScreenDrawer.drawCompass(player.getDirection());
							PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						} else {
							PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
						}
					} else if (player.getDirection() === "south" && gamemap.getRoom(player.getCurrentRoom()).hasSouthExit()){
						this._clearDrawingLayers();
						player.setCurrentRoom(player.getCurrentRoom() + gamemap.getWidth());
						PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
						PlayScreenDrawer.drawCompass(player.getDirection());	
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						
						
						if (!PlayScreenDrawer.isFullMapShowing){
							PlayScreenDrawer.drawCompass(player.getDirection());
							PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						} else {
							PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
						}
					} else if (player.getDirection() === "west" && gamemap.getRoom(player.getCurrentRoom()).hasWestExit()){
						this._clearDrawingLayers();
						player.setCurrentRoom(player.getCurrentRoom() - 1);
						PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
						PlayScreenDrawer.drawCompass(player.getDirection());					
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						
						
						if (!PlayScreenDrawer.isFullMapShowing){
							PlayScreenDrawer.drawCompass(player.getDirection());
							PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						}else {
							PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
						}
					}
					
					if (gamemap.getRoom(player.getCurrentRoom()).hasInteractive()){
						this._drawInteractive();
					}
					
					if (gamemap.getRoom(player.getCurrentRoom()).hasNoninteractive()){
						this._drawNoninteractive();
					}
					
					Canvas.update();
					
				} else if (GameControls.getPlayer1().isDownPressed()){
					if (player.getDirection() === "north" && gamemap.getRoom(player.getCurrentRoom()).hasSouthExit()){
						this._clearDrawingLayers();
						player.setCurrentRoom(player.getCurrentRoom() + gamemap.getWidth());
						PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
						PlayScreenDrawer.drawCompass(player.getDirection());
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						
						if (!PlayScreenDrawer.isFullMapShowing){
							PlayScreenDrawer.drawCompass(player.getDirection());
							PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						} else {
							PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
						}
					} else if (player.getDirection() === "east" && gamemap.getRoom(player.getCurrentRoom()).hasWestExit()){
						this._clearDrawingLayers();
						player.setCurrentRoom(player.getCurrentRoom() - 1);
						PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
						PlayScreenDrawer.drawCompass(player.getDirection());	
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						
						if (!PlayScreenDrawer.isFullMapShowing){
							PlayScreenDrawer.drawCompass(player.getDirection());
							PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						} else {
							PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
						}
					} else if (player.getDirection() === "south" && gamemap.getRoom(player.getCurrentRoom()).hasNorthExit()){
						this._clearDrawingLayers();
						player.setCurrentRoom(player.getCurrentRoom() - gamemap.getWidth());
						PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
						PlayScreenDrawer.drawCompass(player.getDirection());
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						
						if (!PlayScreenDrawer.isFullMapShowing){
							PlayScreenDrawer.drawCompass(player.getDirection());
							PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						} else {
							PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
						}
					} else if (player.getDirection() === "west" && gamemap.getRoom(player.getCurrentRoom()).hasEastExit()){
						this._clearDrawingLayers();
						player.setCurrentRoom(player.getCurrentRoom() + 1);
						PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
						PlayScreenDrawer.drawCompass(player.getDirection());
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						
						if (!PlayScreenDrawer.isFullMapShowing){
							PlayScreenDrawer.drawCompass(player.getDirection());
							PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
						} else {
							PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
						}
					}
					
					if (gamemap.getRoom(player.getCurrentRoom()).hasInteractive()){
						this._drawInteractive();
					}
					
					if (gamemap.getRoom(player.getCurrentRoom()).hasNoninteractive()){
						this._drawNoninteractive();
					}
					
					Canvas.update();
				} else if (GameControls.getPlayer1().isRightPressed()){
					this._clearDrawingLayers();
					
					player.turnRight();
					
					PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
					
					if (!PlayScreenDrawer.isFullMapShowing){
						PlayScreenDrawer.drawCompass(player.getDirection());
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
					} else {
						PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
					}
					
					if (gamemap.getRoom(player.getCurrentRoom()).hasInteractive()){
						this._drawInteractive();
					}
					
					if (gamemap.getRoom(player.getCurrentRoom()).hasNoninteractive()){
						this._drawNoninteractive();
					}
					
					Canvas.update();
					
				 } else if (GameControls.getPlayer1().isLeftPressed()){
					this._clearDrawingLayers();
					
					player.turnLeft();
					
					PlayScreenDrawer.drawDungeonScreen(gamemap.getRoom(player.getCurrentRoom()).getID(), player.getDirection());
					if (!PlayScreenDrawer.isFullMapShowing){
						PlayScreenDrawer.drawCompass(player.getDirection());
						PlayScreenDrawer.drawMinimap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), gamemap, minimap);
					} else {
						PlayScreenDrawer.updateFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
					}
					
					
					if (gamemap.getRoom(player.getCurrentRoom()).hasInteractive()){
						this._drawInteractive();
					}
					
					if (gamemap.getRoom(player.getCurrentRoom()).hasNoninteractive()){
						this._drawNoninteractive();
					}
					
					
					Canvas.update();
			
				 } else if (GameControls.getPlayer1().isStartPressed()) {
					PlayScreenDrawer.toggleFullMap(gamemap.getRoom(player.getCurrentRoom()), player.getCurrentRoom(), player.getDirection(), gamemap, minimap);
					PlayScreenDrawer.toggleHelpPanel();
					Canvas.update();
					
				} else if (GameControls.getPlayer1().isActionPressed()){
					if (gamemap.getRoom(player.getCurrentRoom()).hasInteractive()){
						var type = gamemap.getRoom(player.getCurrentRoom()).getInteractiveType();
							
						if (type === 'npc'){
							Canvas.clearLayer(GraphicsConstants.layers.INTERACTIVE);
							Canvas.clearLayer(GraphicsConstants.layers.TEXT);
							PlayScreenDrawer.drawInteractive(gamemap.getRoom(player.getCurrentRoom()).getInteractiveID());
							PlayScreenDrawer.drawTextBox(interactiveData.getNPCName(gamemap.getRoom(player.getCurrentRoom()).getInteractiveID()), interactiveData.getNPCText(gamemap.getRoom(player.getCurrentRoom()).getInteractiveID()));
							Canvas.update();
						} else if (type === 'video'){
							PlayScreenDrawer.drawVideo();
						}
					}
				}
			}
			
			FrameTimer.advanceFrame();
		}
	}
})();