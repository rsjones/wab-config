module.exports = function (grunt) {
  // Build customizations would be left up to developer to implement.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-tomcat-deploy');
  
  var appHome = grunt.option('appHome') || 'D:/arcgis-web-appbuilder-2.7/WebAppBuilderForArcGIS/server/apps/2';
  
  var port = grunt.option('port') || 8080;
  var host = grunt.option('host') || 'localhost';
  var path = grunt.option('path') || 'wabapp';
  
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
		},
		applyConfig: {
			files: [{
				expand: true,
				cwd: 'app',
				src: ['configs/**'],
				dest: appHome
			}, {
				expand: true,
				cwd: 'app',
				src: ['config.json'],
				dest: appHome
			}]
		}
	},
	
	watch: {
		wab:{
			files: [appHome+'/configs/**', appHome+'/config.json'],
			tasks: ['copy:wabConfig']
		}
	},
	
    // Tomcat redeploy task still gets its config from tomcat_deploy
    // config item
    tomcat_deploy: {
      host: host,
      login: 'tomcat',
      password: 'tomcat',
      path: '/' + path,
      port: port,
      war:  'app.zip',
      deploy: '/manager/text/deploy',
      undeploy: '/manager/text/undeploy'
    },
  });
  
  grunt.registerTask( 'default', [ 'copy:wabConfig', 'watch'] );
  
  grunt.registerTask('deploy', ['tomcat_redeploy']);
};