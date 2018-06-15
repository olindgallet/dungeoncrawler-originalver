/**
 * @author Olin Gallet
 * @date    12/13/2015
 */
var TextUtilities = (function() {
	return {
		/**
			* Constructs text with the specified parameters.
			* @param x       int the x-coordinate of the top left point of the box occupied by the text
			* @param y       int the y-coordinate of the top left point of the box occupied by the text
			* @param text   int the text to display
			* @param color String the color to display the text in hexadecimal
		*/
		makeText: function(x, y, text, size, color){
			var response          = new createjs.Text(text, size + "px StrangeJourney", color);
			response.x            = x;
			response.y            = y;
			response.textBaseline = "alphabetic";
			return response;
		}
	}
})();