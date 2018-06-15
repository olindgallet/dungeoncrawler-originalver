/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/6/2015
 */
/**
 * GraphicsConstants holds constants used for drawing the game.  
 * It also has some location information for the model.
 */
var GraphicsConstants = (function() {
	return {
		CANVAS: "drawing",
		LAYER_COUNT: 11,
		FPS: 30,
		
		banner: {
			Y: 50
		}, 
		
		compass: {
			X: 1115,
			Y: 105, 
			IMG: "data/img/all/compass-spritesheet.png"
		},
		
		dimensions: {
			WIDTH: 1280,
			HEIGHT: 720
		},
		
		fonts: {
			DIR: "css/fonts/",
			arcade: {
				EOT: "ArcadeNormal/ArcadeNormal.eot",
				SVG: "ArcadeNormal/ArcadeNormal.svg",
				TTF: "ArcadeNormal/ArcadeNormal.TTF",
				WOFF: "ArcadeNormal/ArcadeNormal.woff",
				WOFF2: "ArcadeNormal/ArcadeNormal.woff2"
			}
		},
		
		helppanel: {
			IMG: "data/img/all/help-panel.png",
			X:1020,
			Y:255
		},
		
		layers: {
			BG_BOTTOM:   0,
			BG_MIDDLE:   1,
			BG_TOP:      2,
			INTERACTIVE: 3,
			TEXTBOX:     4,
			TEXT:        5,
			MINIMAP:     6,
			COMPASS:     7,
			FULLMAP:     8,
			BANNER:      9,
			HELPPANEL:   10
		},

		bg: {
			bottom: {
				GRASSY_LEFT: "data/img/dungeon_screens/bs-grassy-left.png",
				GRASSY_STRAIGHT: "data/img/dungeon_screens/bs-grassy-straight.png",
				GRASSY_RIGHT: "data/img/dungeon_screens/bs-grassy-right.png",
				GRASSY_T_RIGHT: "data/img/dungeon_screens/bs-grassy-t-right.png",
				GRASSY_T_LEFT: "data/img/dungeon_screens/bs-grassy-t-left.png",
				GRASSY_T_UP: "data/img/dungeon_screens/bs-grassy-t-up.png",
				PATH_LEFTRIGHT: "data/img/dungeon_screens/bs-path-lr.png",
				X: 0,
				Y: 300
			},
			
			middle:{
				GRASSY_STRAIGHT: "data/img/dungeon_screens/ms-grassy-straight.png",
				GRASSY_ELBOW_LEFT: "data/img/dungeon_screens/ms-grassy-elbow-l.png",
				GRASSY_ELBOW_RIGHT: "data/img/dungeon_screens/ms-grassy-elbow-r.png",
				GRASSY_T_DOWN: "data/img/dungeon_screens/ms-grassy-t-down.png",
				GRASSY_T_RIGHT: "data/img/dungeon_screens/ms-grassy-t-right.png",
				GRASSY_T_LEFT: "data/img/dungeon_screens/ms-grassy-t-left.png",
				GRASSY_STUB: "data/img/dungeon_screens/ms-grassy-stub.png",
				GRASSY: "data/img/dungeon_screens/ms-grassy.png",
				X: 0,
				Y: 0
			},
			
			top: {
				OUTSIDE_SKY: "data/img/dungeon_screens/outside-sky.png",
				X: 0,
				Y: 0
			}
		},
		
		fullmap: {
			X:600,
			Y:280,
			border:{
				X: 0,
				Y: 0,
				IMG: "data/maps/map-border.png"
			}
		},
		
		minimap: {
			X: 1100,
			Y: 90,
			frame: {
				IMG: "data/maps/minimap-frame.png"
			},
			
			icons: {
				npc:{
					IMG: "data/maps/map-npc.png"
				},
				
				video:{
					IMG: "data/maps/map-video.png"
				}
			}
		},
		
		name: {
			X: 20,
			Y: 640
		},
		
		npc: {
			X: 0,
			Y: 0,
			IMG: "data/img/dungeon_npcs/interactive-person.png"
		},
		
		objects: {
			movie:{
				X: 0,
				Y: 0,
				IMG: "data/img/dungeon_objects/interactive-movie.png"
			},
			
			text:{
				Y: 512
			}
		},
		
		skylines: {
			bayou:{
				NORTH:"data/img/dungeon_screens/skylines/bayou1.png",
				EAST: "data/img/dungeon_screens/skylines/bayou2.png",
				SOUTH:"data/img/dungeon_screens/skylines/bayou3.png",
				WEST: "data/img/dungeon_screens/skylines/bayou4.png"
			}
		}
		
		spritesheets:{
			minimap: {
				URL: "data/maps/ingame-map-ss.png",
				TILE_WIDTH: 80,
				TILE_HEIGHT: 80
			}
		},
		
		textbox:{
			IMG: "data/img/all/textbox.png",
			X: 0,
			Y: 600
		},
		
		text: {
			X: 40,
			Y: 670
		}
	}
})();