/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   12/6/2015
 */
/**
 * GameState holds information about the game's current state.
 * It's used to communicate between the model and the visuals.
 */
var GameState = (function() {
	var isGameOver;
	var isGameStarted;
	var laneManager;
	var hazardList;
	var scoreKeeper;

	return {
		/**
		 * Ends the game.
		 */
		 endGame: function(){
			 isGameOver = true;
		 },
		 
		 /**
		  * Returns the current lane the player is in.
		  */
		 getCurrentLane: function(){
			 return laneManager.currentLane;
		 },
		 
		 /**
		  * Returns the score.
		  */
		 getScore: function(){
			 return scoreKeeper.score;
		 },
		 
		 /**
		  * Returns all the hazards.
		  */
		 getHazards: function(){
			 return hazardList.hazards;
		 },
		 
		 
		 /**
		  * Increases the score.
		  */
		 increaseScore: function(){
			 scoreKeeper.increaseScore();
		 },
		 
		/**
		 * Returns if the game is over.
		 */
		 isGameOver: function(){
			 return isGameOver;
		 },
		 
		 /**
		  * Returns if the game is started.
		  */
		 isGameStarted: function(){
			 return isGameStarted;
		 },
		 
		 /**
		  * Moves the hazards left.
		  */
		 moveHazardsLeft: function(){
			 hazardList.moveHazardsLeft();
		 },
		 
		 /**
		  * Moves the player down.
		  */
		 movePlayerDown: function(){
			 laneManager.movePlayerDown();
		 },
		 
		 /**
		  * Moves the player up.
		  */
		 movePlayerUp: function(){
			 laneManager.movePlayerUp();
		 },
		
		/**
		 * Resets the game state to its starting state.
		 */
		reset: function(){
			isGameOver    = false;
			isGameStarted = false;
		},
		
		/**
		 * Spawns a column of hazards starting at the farthest right.
		 */
		spawnHazards: function(){
			var lane = Math.floor(Math.random() * 4) ;
			if (lane === 0){
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._2, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._3, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._4, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
			} else if (lane === 1){
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._1, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._3, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._4, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
			} else if (lane === 2){
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._1, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._2, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._4, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
			} else if (lane === 3){
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._1, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._2, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
				hazardList.spawnHazard(GraphicsConstants.dimensions.WIDTH - GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.elements.lanes._3, GraphicsConstants.spritesheets.hazards.WIDTH, GraphicsConstants.spritesheets.hazards.HEIGHT);
			}
		},
		 
		/**
		 * Starts the game.
		 */
		 startGame: function(){
			 isGameStarted = true;
		 }
	}
})();