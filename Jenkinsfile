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
                sh 'npm test'
                sh 'test -f build/index.html'
            }
        }

        stage('E2E') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    reuseNode true
                }
            }
            steps {
                echo 'Setting up E2E environment'
                // 1. Re-install dependencies (Playwright image uses a different OS than Alpine)
                sh 'npm ci' 
                sh 'npm install -g serve'
                
                // 2. Start server in the BACKGROUND using '&'
                echo 'Starting web server in background...'
                sh 'serve -s build & echo $! > .server_pid'
                
                // 3. Wait a few seconds for the server to be ready
                sleep 5
                
                // 4. Run Playwright tests
                sh 'npx playwright test'
            }
            post {
                always {
                    // Clean up the background server process
                    sh 'kill $(cat .server_pid) || true'
                }
            }
        }
    }

    post {
        always {
            // This will only work if your tests are configured to output a JUnit XML file
            junit 'test-results/junit.xml'
        }
    }
}