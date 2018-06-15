module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
		stripBanners: true
      },
      dist: {
        src: ['js_dev/lib/*.js',
				'js_dev/model/**/*.js',
				'js_dev/input/**/*.js',
				 'js_dev/gui/**/*.js',
				 'js_dev/main.js'],
		dest: 'js/main.js'        
      }
    },
	
	clean: {
		fatjs: ['js/*.js', '!js/*.min.js']
	},
	
	uglify: {
		build: {
			src: 'js/main.js',
			dest: 'js/main.min.js'
		}
	},
	
	imagemin: {
		dynamic: {
			files: [{
				expand: true,
				src: ['img_dev/**/*.{png,jpg,gif}'],
				dest: '/'
			}]
		}
	},
	
	sprite:{
      bg: {
        src:      ['img_dev/playscreen/bg/road.png'],
        dest:      'img/playscreen/bg-spritesheet.png',
		destCss:   'img/playscreen/bg-spritesheet.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
      },
	  
	  player: {
		  src: ['img_dev/playscreen/sprites/player-1.png',
				   'img_dev/playscreen/sprites/player-2.png'],
		  dest: 'img/playscreen/player-spritesheet.png',
		  destCss: 'img/playscreen/player-spritesheet.css',
		  algorithm: 'left-right',
		  algorithmOpts: {sort: false},
		  padding: 0
	  },
	  
	  hazard: {
		  src: ['img_dev/playscreen/sprites/hazard.png'],
		  dest: 'img/playscreen/hazard-spritesheet.png',
		  destCss: 'img/playscreen/hazard-spritesheet.css',
		  algorithm: 'left-right',
		  algorithmOpts: {sort: false},
		  padding: 0
	  }
	},
	
	copy: {
	  backup: {
		src: ['css/**', 'data/**', 'data_dev/**', 'js/**', 'js_dev/**', '*.*'],
		dest: 'z:/games/dungeoncrawler/'
	  }
	},

	clean: {
		spritecss: ['img/**/*.css'],
		fatjs: ['js/*.js', '!js/*.min.js']
	},
	
	nwjs: {
		options: {
			platforms: ['linux32', 'win64']
		},
		src: ['./nw/**/*'] // Your NW.js app
	}
	
  }); // The end of grunt.initConfig
  
  // We've set up each task's configuration.
  // Now actually load the tasks.
  // This will do a lookup similar to node's require() function.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  // Register our own custom task alias.
  grunt.registerTask('compile',      ['concat', 'uglify', 'clean:fatjs']);
  grunt.registerTask('compiletest', ['concat']);
  grunt.registerTask('spritesheet',  ['imagemin', 'sprite', 'clean:spritecss']);
  grunt.registerTask('backup', ['copy:backup']);
};