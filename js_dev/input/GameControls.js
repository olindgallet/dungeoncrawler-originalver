var GameControls = (function(){
	var player1 = new InputObserver();
	
	return {
		getPlayer1: function(){
			return player1;
		}
	}
})();