/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   8/2/2017
 */
/**
 * DataConstants holds the locations of the data files for building
 * maps, objects within those maps, and enemies/npcs within those maps.
 *
 * It also contains information about how to translate those maps into a usable
 * form for the program.
 */
var DataConstants = (function() {
	return {	
		maps: {
			WORLDS_UNFAIR: 'data/maps/worldsunfair.json'
		},
		
		text: {
			INTERACTIVE: 'data/maps/interactive-data.json'
		}
	}
})();