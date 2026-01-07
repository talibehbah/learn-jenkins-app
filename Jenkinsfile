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
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test') {
            steps {
                echo 'Testing the jenkins app'
                
                // 1. Run the existing npm tests
                sh 'npm test'
                
                // 2. Verify the build artifact exists
                echo 'Verifying build artifacts...'
                sh 'test -f build/index.html'
            }
        }
    }
}