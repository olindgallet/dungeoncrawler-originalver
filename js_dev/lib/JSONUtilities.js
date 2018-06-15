var JSONUtilities = (function() {
	return {	
		/**
		 * Modified from: https://stackoverflow.com/questions/4116992/how-to-include-json-data-in-javascript-synchronously-without-parsing
		 * 
		 * Loads JSON synchronously given the filepath of the json file.
		 * @function loadJSON
		 * @param filePath {String} the path and filename of the JSON file to load
		 * @return the unencrypted response or null if there was a problem loading.
		 */
		loadJSON: function(filePath) {
			var response = null;
			// Load json file;
			var xmlhttp=new XMLHttpRequest();
			xmlhttp.open("GET",filePath,false);
			
			if (xmlhttp.overrideMimeType) {
				xmlhttp.overrideMimeType("application/json");
			}
			
			xmlhttp.send();
			
			if (xmlhttp.status==200){
				response = xmlhttp.responseText;
			}
			
			return response;
		}
	}
})();