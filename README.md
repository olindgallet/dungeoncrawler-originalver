# dungeoncrawler-originalver
Original version of dungeon-crawler engine as used in the 2018 parade. Putting its memory here as I plan to redo it completely.

If you want to try it out, download the whole thing.
  
- Look at gruntfile.js and download all necessary files for it.  You'll need to recompile things to make a js folder that holds the compiled file.

- You'll need to add in videos if you want that option.  Look in the data/maps folder. The JSON files contain data about what gets shown.  Also use the Tiled program to modify the map.

- You'll likely need to add fonts of your own.  It won't crash the engine, but it'll give you an error message.

Send any questions/comments my way, I'm open to helping you if you want to get this running.
  
 The main reason I want to redo the whole engine is to update the code.  The code is a bit outdated and even though it works I want to update it.  I also want to decouple the map tiles from the map.  As it is the map uses the same tiles no matter want, but I want to be able to change map tiles based on location for example.
