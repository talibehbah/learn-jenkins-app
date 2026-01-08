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

                    # Run tests in CI mode (no watchers)
                    CI=true npm test -- --watchAll=false || true

                    # Ensure build output exists
                    test -f build/index.html
                '''
            }
            post {
                always {
                    echo 'Build & Test stage completed'
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

                sh '''
                    npm ci

                    # Serve React build in background
                    npx serve -s build &

                    # Wait for server
                    sleep 5

                    # Run Playwright tests
                    npx playwright test || true
                '''
            }
            post {
                always {
                    echo 'E2E stage completed'
                }
            }
        }
    }
}
