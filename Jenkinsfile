pipeline {
    agent none 

    stages {
        stage('Build & Test') {
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
                    # Run tests and ensure they exit in CI mode
                    CI=true npm test -- --watchAll=false --testResultsProcessor="jest-junit"
                    test -f build/index.html
                '''
            }
            post {
                always {
                    // Record unit test results here
                    junit 'junit.xml'
                }
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
                echo 'Starting E2E Tests'
                sh 'npm ci'
                
                # Use 'npx serve' instead of 'npm install -g' to avoid permission errors
                # Use '&' to run in background and 'sleep' to wait for startup
                sh 'npx serve -s build & sleep 5 && npx playwright test'
            }
            post {
                always {
                    // Record Playwright results (usually in playwright-report or junit)
                    junit 'test-results/**/*.xml'
                }
            }
        }
    }
}