/**
  author Olin Gallet (olindgallet@olingallet.com)
  date   8/20/2017
 */

/**
 * InteractiveData represents the data for interactives on a map.
 * This includes NPCs, video monuments, and other things players have to
 * voluntarily interact with.
 */
function InteractiveData(){
	this._npcs = [];
	this._videos = [];
}

InteractiveData.prototype = {
	/** 
	 * Gets all NPC IDs.
	 * @function getAllIDs
	 * @return an array of all IDs from the file.
	 */
	 getAllNPCIDs: function(){
		 var ids = [];
		 var i = 0;
		 while (i < this._npcs.length){
			 ids[i] = this._npcs[i].id;
			 i = i + 1;
		 }
		 return ids;
	 },
	 
	 /** 
	 * Gets all IDs.
	 * @function getAllVideoIDs
	 * @return an array of all IDs from the file.
	 */
	 getAllVideoIDs: function(){
		 var ids = [];
		 var i = 0;
		 while (i < this._videos.length){
			 ids[i] = this._videos[i].id;
			 i = i + 1;
		 }
		 return ids;
	 },
	
	/**
	 * Gets all images for prerendering purposes.
	 * @function getAllImages
	 * @return an array of all images from the file.
	 */
	getAllNPCImages: function(){
		var images = [];
		var i = 0;
		
		while (i < this._npcs.length){
			images[i] = this._npcs[i].img;
			i = i + 1;
		}
		
		return images;
	},
	
	/**
	 * Gets the image for the specified ID.
	 * @function getImage
	 * @param id {String} the id of the interactive
	 * @return the image for the specified id or null if it is not found.
	 */
	getNPCImage: function(id){
		var response = null;
		var i = 0;
		while (i < this._npcs.length){
			if (id === this._npcs[i].id){
				response = this._npcs[i].img;
				i = this._npcs.length;
			}
			i = i + 1;
		}
		
		return response;
	},	
	
	/**
	 * Gets the name for the specified ID.
	 * @function getName
	 * @param id {String} the id of the interactive
	 * @return the name for the specified id or null if it is not found.
	 */
	getNPCName: function(id){
		var response = null;
		var i = 0;
		while (i < this._npcs.length){
			if (id === this._npcs[i].id){
				response = this._npcs[i].name;
				i = this._npcs.length;
			}
			i = i + 1;
		}
		
		return response;
	},
	
	/**
	 * Gets the text for the specified ID.
	 * @function getText
	 * @param id {String} id of the interactive
	 * @return the image for the specified id or null if it is not found.
	 */
	getNPCText: function(id){
		var response = null;
		var i = 0;
		while (i < this._npcs.length){
			if (id === this._npcs[i].id){
				response = this._npcs[i].text[0];
				i = this._npcs.length;
			}
			i = i + 1;
		}
		
		return response;
	},	
	
	/**
	 * Gets the video title for the specified ID.
	 * @function getVideoTitle
	 * @param id {String} id of the interactive
	 * @return the image for the specified id or null if it is not found.
	 */
	getVideoTitle: function(id){
		var response = null;
		var i = 0;
		while (i < this._videos.length){
			if (id === this._videos[i].id){
				response = this._videos[i].title;
				i = this._videos.length;
			}
			i = i + 1;
		}
		
		return response;
	},
	
	/**
	 * Gets the video author for the specified ID.
	 * @function getVideoAuthor
	 * @param id {String} id of the interactive
	 * @return the image for the specified id or null if it is not found.
	 */
	getVideoAuthor: function(id){
		var response = null;
		var i = 0;
		while (i < this._videos.length){
			if (id === this._videos[i].id){
				response = this._videos[i].author;
				i = this._videos.length;
			}
			i = i + 1;
		}
		
		return response;
	},
	/**
	 * Loads the interactive data.
	 * @function filename the filename of the JSON interactive data to use.
	 * @throw {String} a message containing the filename unable to be loaded.
	 */
	loadData: function(filename){
		var json = JSONUtilities.loadJSON(filename);
		var npcs = [];
		var videos = [];
		if (json !== null){
			var data = JSON.parse(json);
			
			data['npcs'].forEach(function(element){
				npcs.push({
					name: element['name'],
					id: element['id'],
					img: element['img'],
					text: element['text']
				});
			});
			
			data['videos'].forEach(function(element){
				videos.push({
					title: element['title'],
					author: element['author'],
					id: element['id']
				});
			});
			this._npcs = npcs;
			this._videos = videos;
			
		} else {
			throw "could not load filename: " + filename;
		}
	}
};