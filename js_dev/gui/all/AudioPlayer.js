/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/6/2015
 */

 /**
  * The AudioPlayer loads up audio files and readies their id for use.
  */
var AudioPlayer = (function() {
	return {	
		/**
		 * Initializes the audio player.
		 */
		init: function(){
			createjs.Sound.registerSound(AudioConstants.musicfiles.CANAL, AudioConstants.musicids.CANAL);
		}
	}
})();