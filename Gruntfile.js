module.exports = function (grunt) {
  // Build customizations would be left up to developer to implement.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  var appHome = grunt.option('appHome') || 'D:/arcgis-web-appbuilder-2.7/WebAppBuilderForArcGIS/server/apps/2';
  
  grunt.initConfig({
	copy: {
		wabConfig: {
			files: [{
				expand: true,
				cwd: appHome,
				src: ['configs/**'],
				dest: 'app'
			}, {
				expand: true,
				cwd: appHome,
				src: ['config.json'],
				dest: 'app'
			}]
		}
	}
  });
  
  grunt.registerTask( 'default', [ 'copy'] );
};