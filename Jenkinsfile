pipeline {
    agent {
        docker {
            image 'node:25-alpine3.22'
            reuseNode true
        }
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test') {
            steps {
                echo 'Testing the jenkins app'
                // This will run the "test" script defined in your package.json
                sh 'npm test' 
            }
        }
    }
}