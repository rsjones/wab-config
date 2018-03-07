pipeline {
	agent { label 'windows' }
	stages {
		stage('build wab') {
			steps {
				powershell "cp -recurse ${params.WAB_TEMPLATE_APP} app"
				powershell "cp -recurse -force custom-widgets\\widgets app"
				powershell "cp -recurse -force app-config\\* app"
				powershell "npm install"
				powershell "npm run build"
			}
			post {
				success {
					dir('dist/buildOutput') {
						stash includes: 'app.zip', name: 'app'
					}
				}
			}
		}
	}
}