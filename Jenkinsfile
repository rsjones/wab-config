pipeline {
	agent { label 'windows' }
	stages {
		stage('build wab') {
			steps {
				powershell "cp -recurse -force -verbose ${params.WAB_TEMPLATE_APP} app"
				powershell "cp -recurse -force -verbose custom-widgets\\widgets app"
				powershell "cp -recurse -force -verbose app-config\\* app"
				bat 'npm install'
				bat 'npm run build'
			}
			post {
				success {
					dir('dist/buildOutput') {
						stash includes: 'app.zip', name: 'app'
					}
				}
			}
		}
		stage('deploy QA') {
			steps {
				unstash 'app'
				bat 'grunt deploy'
			}
		}
		stage('deploy Prod') {
			steps {
			    milestone(3)
			    input message: 'Deploy?'
				unstash 'app'
				bat 'grunt deploy --port=8081'
				milestone(4)
			}
		}
	}
}