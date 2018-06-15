/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/12/2015
 */
 /**
  * The PlayScreenDrawer draws various sprites and text for the
  * play screen.
 */
var PlayScreenDrawer = (function() {
	//var _playerSheet = new SpriteSheet(GraphicsConstants.spritesheets.player.URL, GraphicsConstants.spritesheets.player.WIDTH, GraphicsConstants.spritesheets.player.HEIGHT);
	//var _playerAnimation = new Animation("player", 0, 1);
	//var _hazardSheet = new SpriteSheet(GraphicsConstants.spritesheets.hazards.URL, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
	var isFullMapShowing = false;
	var isHelpPanelShowing = false;
	
	var _mapImages         = [];
	var _compass           = [];
	var _interactiveImages = [];
	var _textbox           = null;
	var _minimapFrame      = null;
	var _npc               = null;
	var _movie             = null;
	var _banner            = '';
	var _fullmapBorder     = null;
	var _mapNPC            = null;
	var _mapVideo          = null;
	var _helpPanel         = null;
	
	const TRANSLUCENCY = .80;
	
	return {		
		drawBanner: function(text){
			var textItem = TextUtilities.makeText(0, GraphicsConstants.banner.Y, text, 50, '#fff');
			textItem.x = Math.floor((1280 - textItem.getMeasuredWidth()) / 2);
			Canvas.addComponent(GraphicsConstants.layers.BANNER, textItem);
			_banner = text;
		},
		
		drawCompass: function(direction){
			switch (direction){
				case 'north':
					Canvas.addComponent(GraphicsConstants.layers.COMPASS, _compass["north"]);
					break;
					
				case 'east':
					Canvas.addComponent(GraphicsConstants.layers.COMPASS, _compass["east"]);
					break;
					
				case 'south':
					Canvas.addComponent(GraphicsConstants.layers.COMPASS, _compass["south"]);
					break;
					
				case 'west': 
					Canvas.addComponent(GraphicsConstants.layers.COMPASS, _compass["west"]);
					break;			
			}
			
			
		},
		
		toggleHelpPanel: function(){
			if (!isHelpPanelShowing){
				Canvas.addComponent(GraphicsConstants.layers.HELPPANEL, _helpPanel);
				isHelpPanelShowing = true;
			} else {
				isHelpPanelShowing = false;
				Canvas.clearLayer(GraphicsConstants.layers.HELPPANEL);
			}
		},
		
		drawMinimap: function(currentRoom, currentRoomNumber, gamemap, minimap){
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, _minimapFrame);
			
			var tile = minimap.getTile(currentRoomNumber);
			tile.x = GraphicsConstants.minimap.X;
			tile.y = GraphicsConstants.minimap.Y;
			
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
			
			if (currentRoom.hasWestExit()){
				tile = minimap.getTile(currentRoom.getWestExitID());
				tile.x = GraphicsConstants.minimap.X - GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
				tile.y = GraphicsConstants.minimap.Y;
				Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
				
				if (gamemap.getRoom(currentRoom.getWestExitID()).hasInteractive()){
					var type = gamemap.getRoom(currentRoom.getWestExitID()).getInteractiveType();
				
					if (type === 'npc'){	
						var icon = _mapNPC.clone();
						icon.x = GraphicsConstants.minimap.X + 15 - GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
						icon.y = GraphicsConstants.minimap.Y + 15;
						Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);
					} else if (type === 'video'){
						var icon = _mapVideo.clone();
						icon.x = GraphicsConstants.minimap.X + 15 - GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
						icon.y = GraphicsConstants.minimap.Y + 15;
						Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);			
					}
				}
			} else {
				tile = minimap.getBlankTile();
				tile.x = GraphicsConstants.minimap.X - GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
				tile.y = GraphicsConstants.minimap.Y;
				Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
			}
			
			if (currentRoom.hasEastExit()){
				tile = minimap.getTile(currentRoom.getEastExitID());
				tile.x = GraphicsConstants.minimap.X + GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
				tile.y = GraphicsConstants.minimap.Y;
				Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
				
				if (gamemap.getRoom(currentRoom.getEastExitID()).hasInteractive()){
					var type = gamemap.getRoom(currentRoom.getEastExitID()).getInteractiveType();
				
					if (type === 'npc'){	
						var icon = _mapNPC.clone();
						icon.x = GraphicsConstants.minimap.X + 15 + GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
						icon.y = GraphicsConstants.minimap.Y + 15;
						Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);
					} else if (type === 'video'){
						var icon = _mapVideo.clone();;
						icon.x = GraphicsConstants.minimap.X + 15 + GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
						icon.y = GraphicsConstants.minimap.Y + 15;
						Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);			
					}
				}
			} else {
				tile = minimap.getBlankTile();
				tile.x = GraphicsConstants.minimap.X + GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
				tile.y = GraphicsConstants.minimap.Y;
				Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
			}
			
			if (currentRoom.hasNorthExit()){
				tile = minimap.getTile(currentRoom.getNorthExitID());
				tile.x = GraphicsConstants.minimap.X;
				tile.y = GraphicsConstants.minimap.Y - GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
				Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
				
				if (gamemap.getRoom(currentRoom.getNorthExitID()).hasInteractive()){
					var type = gamemap.getRoom(currentRoom.getNorthExitID()).getInteractiveType();
				
					if (type === 'npc'){	
						var icon = _mapNPC.clone();;
						icon.x = GraphicsConstants.minimap.X + 15;
						icon.y = GraphicsConstants.minimap.Y + 15 - GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
						Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);
					} else if (type === 'video'){
						var icon = _mapVideo.clone();;
						icon.x = GraphicsConstants.minimap.X + 15;
						icon.y = GraphicsConstants.minimap.Y + 15 - GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
						Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);			
					}
				}
			} else {
				tile = minimap.getBlankTile();
				tile.x = GraphicsConstants.minimap.X;
				tile.y = GraphicsConstants.minimap.Y - GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
				Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
			}
			
			if (currentRoom.hasSouthExit()){
				tile = minimap.getTile(currentRoom.getSouthExitID());
				tile.x = GraphicsConstants.minimap.X;
				tile.y = GraphicsConstants.minimap.Y + GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
				Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
				
				if (gamemap.getRoom(currentRoom.getSouthExitID()).hasInteractive()){
					var type = gamemap.getRoom(currentRoom.getSouthExitID()).getInteractiveType();
				
					if (type === 'npc'){	
						var icon = _mapNPC.clone();;
						icon.x = GraphicsConstants.minimap.X + 15;
						icon.y = GraphicsConstants.minimap.Y + 15 + GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
						Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);
					} else if (type === 'video'){
						var icon = _mapVideo.clone();;
						icon.x = GraphicsConstants.minimap.X + 15;
						icon.y = GraphicsConstants.minimap.Y + 15 + GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
						Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);			
					}
				}
			} else {
				tile = minimap.getBlankTile();
				tile.x = GraphicsConstants.minimap.X;
				tile.y = GraphicsConstants.minimap.Y + GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
				Canvas.addComponent(GraphicsConstants.layers.MINIMAP, tile);
			}
			
			if (currentRoom.hasInteractive()){
				var type = currentRoom.getInteractiveType();
			
				if (type === 'npc'){	
					var icon = _mapNPC.clone();;
					icon.x = GraphicsConstants.minimap.X + 15;
					icon.y = GraphicsConstants.minimap.Y + 15;
					Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);
				} else if (type === 'video'){
					var icon = _mapVideo.clone();;
					icon.x = GraphicsConstants.minimap.X + 15;
					icon.y = GraphicsConstants.minimap.Y + 15;
					Canvas.addComponent(GraphicsConstants.layers.MINIMAP, icon);			
				}
			}
		},
		
		drawDungeonScreen: function(roomID, direction){
			var bgMiddle, bgBottom, bgTop;
			if (direction === 'north'){
				switch (roomID){
					case 'ttob':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'ltor':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'tl-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_RIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;
						
					case 'tr-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_LEFT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;
						
					case 'bl-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_RIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
					
					case 'br-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_LEFT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;		
						
					case 't-up':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				
					case 't-right':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_RIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_RIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				

					case 't-down':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_DOWN];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
								
					case 't-left':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_LEFT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_LEFT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
					
					case 'crossroads':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'n-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STUB];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'e-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 's-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'w-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				}
			} else if (direction === 'east'){
				
				switch (roomID){
					case 'ttob':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'ltor':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'tl-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_RIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;
						
					case 'tr-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_RIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;
					
						
					case 'bl-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_LEFT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'br-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_LEFT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;					
					
					case 't-up':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_LEFT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_LEFT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
					
					case 't-right':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 't-down':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_RIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_RIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				
					case 't-left':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_DOWN];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'crossroads':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						
						break;
						
					case 'n-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'e-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 's-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'w-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STUB];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				}			
			} else if (direction === 'south'){
				
				switch (roomID){
					case 'ttob':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;
						
					case 'ltor':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'tl-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_LEFT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;
						
					case 'tr-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_RIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;
						
					case 'bl-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_LEFT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'br-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_RIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;					
					
					case 't-up':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_DOWN];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
									
					case 't-right':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_LEFT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_LEFT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 't-down':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				
					case 't-left':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_RIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_RIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
					
					case 'crossroads':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						
						break;
						
					case 'n-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'e-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 's-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STUB];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'w-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				}
				
			} else if (direction === 'west'){
				
				switch (roomID){
					case 'ttob':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'ltor':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'tl-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_LEFT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;
						
					case 'tr-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_LEFT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
					break;
						
					case 'bl-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_RIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'br-elbow':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_RIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						break;					
					
					case 't-up':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_RIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_RIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
									
					case 't-right':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_DOWN];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
					
					case 't-down':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_T_LEFT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_LEFT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				
					case 't-left':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
					
					case 'crossroads':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'n-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'e-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STUB];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 's-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
						
					case 'w-stub':
						bgMiddle   = _mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT];
						bgMiddle.x = GraphicsConstants.bg.middle.X;
						bgMiddle.y = GraphicsConstants.bg.middle.Y;
						
						bgBottom   = _mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT];
						bgBottom.x = GraphicsConstants.bg.bottom.X;
						bgBottom.y = GraphicsConstants.bg.bottom.Y;
						
						bgTop      = _mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY];
						bgTop.x    = GraphicsConstants.bg.top.X;
						bgTop.y    = GraphicsConstants.bg.top.Y;
						
						break;
				}
				
			}
						
			Canvas.addComponent(GraphicsConstants.layers.BG_TOP, bgTop);
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, bgMiddle);
			Canvas.addComponent(GraphicsConstants.layers.BG_BOTTOM, bgBottom);
		},

		drawHUD: function(){
			var text = TextUtilities.makeText(100, 620, 'Player 1', 20, '#fff');
			var text2 = TextUtilities.makeText(110, 640, 'HP', 16, '#fff');
			var text3 = TextUtilities.makeText(110, 660, 'AP', 16, '#fff');
			
			var text4 = TextUtilities.makeText(400, 620, 'Player 2', 20, '#fff');
			var text5 = TextUtilities.makeText(410, 640, 'HP', 16, '#fff');
			var text6 = TextUtilities.makeText(410, 660, 'AP', 16, '#fff');
			
			var text7 = TextUtilities.makeText(700, 620, 'Player 3', 20, '#fff');
			var text8 = TextUtilities.makeText(710, 640, 'HP', 16, '#fff');
			var text9 = TextUtilities.makeText(710, 660, 'AP', 16, '#fff');
			
			var text10 = TextUtilities.makeText(1000, 620, 'Player 4', 20, '#fff');
			var text11 = TextUtilities.makeText(1010, 640, 'HP', 16, '#fff');
			var text12 = TextUtilities.makeText(1010, 660, 'AP', 16, '#fff');
			
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text2);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text3);
			
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text4);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text5);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text6);
			
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text7);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text8);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text9);
			
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text10);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text11);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text12);
		},
		
		drawInteractive: function(id){
			var image = _interactiveImages[id];
			
			image.x = 0;
			image.y = 0;
			Canvas.addComponent(GraphicsConstants.layers.INTERACTIVE, image);
		},
		
		drawNPCShadow: function(name){
			Canvas.addComponent(GraphicsConstants.layers.INTERACTIVE, _npc);
			
			var text = TextUtilities.makeText(0, GraphicsConstants.objects.text.Y, name, 40, '#fff');
			text.x = Math.floor((1280 - text.getMeasuredWidth()) / 2);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text);
		},
		
		drawVideoShadow: function(title, author){
			Canvas.addComponent(GraphicsConstants.layers.INTERACTIVE, _movie);
			
			var text = TextUtilities.makeText(0, GraphicsConstants.objects.text.Y, title + " by " + author, 40, '#fff');
			text.x = Math.floor((1280 - text.getMeasuredWidth()) / 2);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text);
		},
		
		drawTextBox: function(name, text){
			var name = TextUtilities.makeText(GraphicsConstants.name.X, GraphicsConstants.name.Y, name, 40, '#fff');
			var text = TextUtilities.makeText(GraphicsConstants.text.X, GraphicsConstants.text.Y, text, 40, '#fff');
			Canvas.addComponent(GraphicsConstants.layers.TEXT, name);
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text);
			Canvas.addComponent(GraphicsConstants.layers.TEXTBOX, _textbox);
		},
		
		drawVideo: function(){
			GameControls.getPlayer1().isAcceptingInput = false;
			vex.dialog.alert({
				unsafeMessage: '<video style="float: left; width: 70%;" preload="auto" autoplay controls loop><source src="data/videos/78_GREAT_RIVER_RD.mp4" type="video/mp4"></video>' +
							   '<div style="float: right; width: 30%; padding-left: 10px;" >' + 
							   '<h2>Video Name Goes Here</h2>' +
							   '<div>Author: John Doe</div>' + 
							   '<div>Description: This video is about something something something something something something something something something.</div>' +
							   '<div>Comment Box?</div>' +
							   '</div>',
				callback: function (data) {
					GameControls.getPlayer1().isAcceptingInput = true;
				}
			});
		},
		
		prerender: function(interactiveData){
			var image;
			
			image = new createjs.Bitmap(GraphicsConstants.bg.middle.GRASSY_ELBOW_LEFT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_LEFT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.middle.GRASSY_ELBOW_RIGHT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.middle.GRASSY_ELBOW_RIGHT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.middle.GRASSY_STRAIGHT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.middle.GRASSY_STRAIGHT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
						
			image = new createjs.Bitmap(GraphicsConstants.bg.bottom.GRASSY_RIGHT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.bottom.GRASSY_RIGHT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_BOTTOM, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.bottom.GRASSY_STRAIGHT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.bottom.GRASSY_STRAIGHT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_BOTTOM, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.top.OUTSIDE_SKY);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.top.OUTSIDE_SKY] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_TOP, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.bottom.PATH_LEFTRIGHT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.bottom.PATH_LEFTRIGHT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_BOTTOM, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.middle.GRASSY);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.middle.GRASSY] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.bottom.GRASSY_LEFT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.bottom.GRASSY_LEFT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_BOTTOM, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.middle.GRASSY_T_DOWN);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.middle.GRASSY_T_DOWN] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.bottom.GRASSY_T_RIGHT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.bottom.GRASSY_T_RIGHT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_BOTTOM, image);
			Canvas.update();
			
			
			image = new createjs.Bitmap(GraphicsConstants.bg.middle.GRASSY_T_RIGHT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.middle.GRASSY_T_RIGHT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.middle.GRASSY_T_LEFT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.middle.GRASSY_T_LEFT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.bottom.GRASSY_T_LEFT);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.bottom.GRASSY_T_LEFT] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_BOTTOM, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.bottom.GRASSY_T_UP);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.bottom.GRASSY_T_UP] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.bg.middle.GRASSY_STUB);
			image.x = 0;
			image.y = 0;
			_mapImages[GraphicsConstants.bg.middle.GRASSY_STUB] = image;
			Canvas.addComponent(GraphicsConstants.layers.BG_MIDDLE, image);
			Canvas.update();
			
			var i = 0;
			var ids = interactiveData.getAllNPCIDs();
			while (i < ids.length){
				image = new createjs.Bitmap(interactiveData.getNPCImage(ids[i]));
				image.x = 0;
				image.y = 0;
				_interactiveImages[ids[i]] = image;
				Canvas.addComponent(GraphicsConstants.layers.BG_TOP, image);
				Canvas.update();
				
				i = i + 1;
			}
			
			text = TextUtilities.makeText(0, 0, 'abcdefghijklmnopqrstuvwxyz', 20, '#fff');
			Canvas.addComponent(GraphicsConstants.layers.TEXT, text);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.textbox.IMG);
			image.x = GraphicsConstants.textbox.X;
			image.y = GraphicsConstants.textbox.Y;
			_textbox = image;
			Canvas.addComponent(GraphicsConstants.layers.TEXTBOX, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.compass.IMG);
			var spritesheet = new SpriteSheet(GraphicsConstants.compass.IMG, 50, 48);
			
			image   = spritesheet.getFrame(0);
			image.x = GraphicsConstants.compass.X;
			image.y = GraphicsConstants.compass.Y;
			_compass["north"] = image;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			Canvas.update();
			
			image   = spritesheet.getFrame(2);
			image.x = GraphicsConstants.compass.X;
			image.y = GraphicsConstants.compass.Y;
			_compass["east"] = image;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			Canvas.update();
			
			image   = spritesheet.getFrame(4);
			image.x = GraphicsConstants.compass.X;
			image.y = GraphicsConstants.compass.Y;
			_compass["south"] = image;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			Canvas.update();
			
			image   = spritesheet.getFrame(6);
			image.x = GraphicsConstants.compass.X;
			image.y = GraphicsConstants.compass.Y;
			_compass["west"] = image;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.minimap.frame.IMG);
			image.x = GraphicsConstants.minimap.X - GraphicsConstants.spritesheets.minimap.TILE_WIDTH;
			image.y = GraphicsConstants.minimap.Y - GraphicsConstants.spritesheets.minimap.TILE_HEIGHT;
			_minimapFrame  = image;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.npc.IMG);
			image.x = GraphicsConstants.npc.X;
			image.y = GraphicsConstants.npc.Y;
			_npc = image;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.objects.movie.IMG);
			image.x = GraphicsConstants.objects.movie.X;
			image.y = GraphicsConstants.objects.movie.Y;
			_movie  = image;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.fullmap.border.IMG);
			image.x = GraphicsConstants.fullmap.border.X;
			image.y = GraphicsConstants.fullmap.border.Y;
			_fullmapBorder = image;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.minimap.icons.npc.IMG);
			image.x = GraphicsConstants.fullmap.border.X;
			image.y = GraphicsConstants.fullmap.border.Y;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			_mapNPC = image;
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.minimap.icons.video.IMG);
			image.x = GraphicsConstants.fullmap.border.X;
			image.y = GraphicsConstants.fullmap.border.Y;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			_mapVideo = image;
			Canvas.update();
			
			image = new createjs.Bitmap(GraphicsConstants.helppanel.IMG);
			image.x = GraphicsConstants.helppanel.X;
			image.y = GraphicsConstants.helppanel.Y;
			Canvas.addComponent(GraphicsConstants.layers.MINIMAP, image);
			_helpPanel = image;
			Canvas.update();
			
			Canvas.clearAllLayers();
		}, 
		
		toggleFullMap: function(currentRoom, currentRoomNumber, direction, gamemap, minimap){
			if (!PlayScreenDrawer.isFullMapShowing){
				PlayScreenDrawer.updateFullMap(currentRoom, currentRoomNumber, direction, gamemap, minimap);
			} else {
				Canvas.clearLayer(GraphicsConstants.layers.FULLMAP);
				
				PlayScreenDrawer.drawCompass(direction);
				PlayScreenDrawer.drawMinimap(currentRoom, currentRoomNumber, gamemap, minimap);
			}
			
			PlayScreenDrawer.isFullMapShowing = !PlayScreenDrawer.isFullMapShowing;
		},
		
		updateFullMap: function(currentRoom, currentRoomNumber, direction, gamemap, minimap){
			Canvas.clearLayer(GraphicsConstants.layers.COMPASS);
			Canvas.clearLayer(GraphicsConstants.layers.MINIMAP);
			Canvas.clearLayer(GraphicsConstants.layers.FULLMAP);
				
				var x = 0;
				var y = 0;
				var tile;
				var mapSize = minimap.getWidth() * minimap.getHeight();
				
				while (y < 4){
					while (x < 8){
						//bottom items
						if (x !== 0){
							if (currentRoomNumber % minimap.getWidth() + x < minimap.getWidth() && currentRoomNumber + x + (y * minimap.getWidth()) < mapSize){
								tile = minimap.getTile(currentRoomNumber + x + (y * minimap.getWidth()));
								tile.x = GraphicsConstants.fullmap.X + (x * 80);
								tile.y = GraphicsConstants.fullmap.Y + (y * 80);
								tile.alpha = .5;
								Canvas.addComponent(GraphicsConstants.layers.FULLMAP, tile);
								
								if (gamemap.getRoom(currentRoomNumber + x + (y * minimap.getWidth())) !== null && gamemap.getRoom(currentRoomNumber + x + (y * minimap.getWidth())).hasInteractive()){
									var type = gamemap.getRoom(currentRoomNumber + x + (y * minimap.getWidth())).getInteractiveType();
			
									if (type === 'npc'){	
										var icon = _mapNPC.clone();;
										icon.x = GraphicsConstants.fullmap.X + (x * 80) + 15;
										icon.y = GraphicsConstants.fullmap.Y + (y * 80) + 15;
										Canvas.addComponent(GraphicsConstants.layers.FULLMAP, icon);
									} else if (type === 'video'){
										var icon = _mapVideo.clone();;
										icon.x = GraphicsConstants.fullmap.X + (x * 80) + 15;
										icon.y = GraphicsConstants.fullmap.Y + (y * 80) + 15;
										Canvas.addComponent(GraphicsConstants.layers.FULLMAP, icon);			
									}
								}
								
							} else {
								tile = minimap.getBlankTile();
								tile.x = GraphicsConstants.fullmap.X + (x * 80);
								tile.y = GraphicsConstants.fullmap.Y + (y * 80);
								tile.alpha = .5;
								Canvas.addComponent(GraphicsConstants.layers.FULLMAP, tile);
							}
							
							if (y !== 0){
								if (currentRoomNumber % minimap.getWidth() + x < minimap.getWidth() && currentRoomNumber + x - (y * minimap.getWidth()) < mapSize && currentRoomNumber + x - (y * minimap.getWidth()) > 0){
									tile = minimap.getTile(currentRoomNumber + x - (y * minimap.getWidth()));
									tile.x = GraphicsConstants.fullmap.X + (x * 80);
									tile.y = GraphicsConstants.fullmap.Y - (y * 80);
									tile.alpha = .5;
									Canvas.addComponent(GraphicsConstants.layers.FULLMAP, tile);
									
									if (gamemap.getRoom(currentRoomNumber + x - (y * minimap.getWidth())) !== null && gamemap.getRoom(currentRoomNumber + x - (y * minimap.getWidth())).hasInteractive()){
										var type = gamemap.getRoom(currentRoomNumber + x - (y * minimap.getWidth())).getInteractiveType();
				
										if (type === 'npc'){	
											var icon = _mapNPC.clone();;
											icon.x = GraphicsConstants.fullmap.X + (x * 80) + 15;
											icon.y = GraphicsConstants.fullmap.Y - (y * 80) + 15;
											Canvas.addComponent(GraphicsConstants.layers.FULLMAP, icon);
										} else if (type === 'video'){
											var icon = _mapVideo.clone();;
											icon.x = GraphicsConstants.fullmap.X + (x * 80) + 15;
											icon.y = GraphicsConstants.fullmap.Y - (y * 80) + 15;
											Canvas.addComponent(GraphicsConstants.layers.FULLMAP, icon);			
										}
									}
								} else {
									tile = minimap.getBlankTile();
									tile.x = GraphicsConstants.fullmap.X + (x * 80);
									tile.y = GraphicsConstants.fullmap.Y - (y * 80);
									tile.alpha = .5;
									Canvas.addComponent(GraphicsConstants.layers.FULLMAP, tile);
								}
							}
						}
						
						// bottom left
						if (y !== 0){
							if (currentRoomNumber % minimap.getWidth() - x > 0 && currentRoomNumber - x + (y * minimap.getWidth()) > 0 && currentRoomNumber - x + (y * minimap.getWidth()) < mapSize){
								tile = minimap.getTile(currentRoomNumber - x + (y * minimap.getWidth()));
								tile.x = GraphicsConstants.fullmap.X - (x * 80);
								tile.y = GraphicsConstants.fullmap.Y + (y * 80);
								tile.alpha = .5;
								Canvas.addComponent(GraphicsConstants.layers.FULLMAP, tile);
								
								if (gamemap.getRoom(currentRoomNumber - x + (y * minimap.getWidth())) !== null && gamemap.getRoom(currentRoomNumber - x + (y * minimap.getWidth())).hasInteractive()){
									var type = gamemap.getRoom(currentRoomNumber - x + (y * minimap.getWidth())).getInteractiveType();
			
									if (type === 'npc'){	
										var icon = _mapNPC.clone();
										icon.x = GraphicsConstants.fullmap.X - (x * 80) + 15;
										icon.y = GraphicsConstants.fullmap.Y + (y * 80) + 15;
										Canvas.addComponent(GraphicsConstants.layers.FULLMAP, icon);
									} else if (type === 'video'){
										var icon = _mapVideo.clone();
										icon.x = GraphicsConstants.fullmap.X - (x * 80) + 15;
										icon.y = GraphicsConstants.fullmap.Y + (y * 80) + 15;
										Canvas.addComponent(GraphicsConstants.layers.FULLMAP, icon);			
									}
								}
							} else {
								tile = minimap.getBlankTile();
								tile.x = GraphicsConstants.fullmap.X - (x * 80);
								tile.y = GraphicsConstants.fullmap.Y + (y * 80);
								tile.alpha = .5;
								Canvas.addComponent(GraphicsConstants.layers.FULLMAP, tile);
							}
							
						}
						
						
						//top left
						if (currentRoomNumber % minimap.getWidth() - x < minimap.getWidth() && currentRoomNumber - x - (y * minimap.getWidth())> 0 && currentRoomNumber - x - (y * minimap.getWidth()) < mapSize){
							tile = minimap.getTile(currentRoomNumber - x - (y * minimap.getWidth()));
							tile.x = GraphicsConstants.fullmap.X - (x * 80);
							tile.y = GraphicsConstants.fullmap.Y - (y * 80);
							tile.alpha = .5;
							Canvas.addComponent(GraphicsConstants.layers.FULLMAP, tile);
							
							if (gamemap.getRoom(currentRoomNumber - x - (y * minimap.getWidth())) !== null && gamemap.getRoom(currentRoomNumber - x - (y * minimap.getWidth())).hasInteractive()){
								var type = gamemap.getRoom(currentRoomNumber - x - (y * minimap.getWidth())).getInteractiveType();
		
								if (type === 'npc'){	
									var icon = _mapNPC.clone();
									icon.x = GraphicsConstants.fullmap.X - (x * 80) + 15;
									icon.y = GraphicsConstants.fullmap.Y - (y * 80) + 15;
									Canvas.addComponent(GraphicsConstants.layers.FULLMAP, icon);
								} else if (type === 'video'){
									var icon = _mapVideo.clone();;
									icon.x = GraphicsConstants.fullmap.X - (x * 80) + 15;
									icon.y = GraphicsConstants.fullmap.Y - (y * 80) + 15;
									Canvas.addComponent(GraphicsConstants.layers.FULLMAP, icon);			
								}
							}
						} else {
							tile = minimap.getBlankTile();
							tile.x = GraphicsConstants.fullmap.X - (x * 80);
							tile.y = GraphicsConstants.fullmap.Y - (y * 80);
							tile.alpha = .5;
							Canvas.addComponent(GraphicsConstants.layers.FULLMAP, tile);
						}							
				
							
						x = x + 1;
					}
					y = y + 1;
					x = 0;
				}		
				
				switch (direction){
					case 'north':
					var comp = _compass["north"].clone();
					comp.x = GraphicsConstants.fullmap.X + 15;
					comp.y = GraphicsConstants.fullmap.Y + 15;
					comp.alpha = TRANSLUCENCY;
					Canvas.addComponent(GraphicsConstants.layers.FULLMAP, comp);
					break;
					
					case 'east':
					var comp = _compass["east"].clone();
					comp.x = GraphicsConstants.fullmap.X + 15;
					comp.y = GraphicsConstants.fullmap.Y + 15;
					comp.alpha = TRANSLUCENCY;
					Canvas.addComponent(GraphicsConstants.layers.FULLMAP, comp);
					break;
					
					case 'south':
					var comp = _compass["south"].clone();
					comp.x = GraphicsConstants.fullmap.X + 15;
					comp.y = GraphicsConstants.fullmap.Y + 15;
					comp.alpha = TRANSLUCENCY;
					Canvas.addComponent(GraphicsConstants.layers.FULLMAP, comp);
					break;
					
					case 'west': 
					var comp = _compass["west"].clone();
					comp.x = GraphicsConstants.fullmap.X + 15;
					comp.y = GraphicsConstants.fullmap.Y + 15;
					comp.alpha = TRANSLUCENCY;
					Canvas.addComponent(GraphicsConstants.layers.FULLMAP, comp);
					break;			
				}
				
				Canvas.addComponent(GraphicsConstants.layers.FULLMAP, _fullmapBorder);
		}
	}
})();