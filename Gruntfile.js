module.export = function (grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.initConfig({
		uglify:{
			dist:{
				build:{
					src:['js/*.js', 'plugins/*.js'],
					dest:'js/application.min.js'
				}
			}
		}
	})

	grunt.registerTask('default', ['uglify']);
}