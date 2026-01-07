pipeline {
    // 1. Change top-level agent to none
    agent none 

    stages {
        stage('Build & Test') {
            // 2. Move the Node agent here
            agent {
                docker {
                    image 'node:25-alpine3.22'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm ci
                    npm run build
                    npm test
                    test -f build/index.html
                '''
            }
        }

        stage('E2E') {
            // 3. This will now run on the Jenkins host, which HAS docker
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    reuseNode true
                }
            }
            steps {
                echo 'Starting E2E Tests'
                // Tip: In Playwright image, you usually need to install deps first
                sh 'npm ci'
                
                // Start your server in the background and run tests
                // (Using the background fix we discussed previously)
                sh 'npm install -g serve'
                sh 'serve -s build & sleep 5 && npx playwright test'
            }
        }
    }

    post {
        always {
            junit 'test-results/junit.xml'
        }
    }
}