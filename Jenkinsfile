pipeline{
    tools{
        nodejs "Nodejs"
    }

    environment {
        DOCKER_REGISTRY = "docker.io"
        DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIAL')
        VERSION = "${env.BUILD_ID}"
    }

    stages{
        stage('Install Dependencies'){
            steps{
                sh 'npm ci'
            }
        }

        stage('Build Project'){
            steps{
                sh 'npm run build'
            }
        }

        stage('Docker Build and Push') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'DOCKER_HUB_CREDENTIAL', // Matches your Jenkins Credential ID exactly
            passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW', // Jenkins injects your password here
            usernameVariable: 'DOCKERHUB_CREDENTIALS_USR'  // Jenkins injects "vipiiin" here
        )]) {
            // Log in securely using separate username and password variables
            sh 'echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin'
            
            // Build and push using double quotes to allow Jenkins to expand the ${VERSION} variable
            sh "docker build -t vipiiin/food-delivery-app-server:${VERSION} ."
            sh "docker push vipiiin/food-delivery-app-server:${VERSION}"
        }
    }
}
        stage('Cleanup Workspace'){
            steps {
                deleteDir()
            }
        }

        stage('Update Image tag in GitOps'){
            steps {
                checkout scmGit(branches: [[name: '*/main']],extensions:[],userRemoteConfigs: [[credentialsId: 'git-ssh', url: 'git@github.com:vipin-food-delivery-app/deployment-folder.git']])
                script {
                    sh 'git config user.email "jenkins-ci@yourdomain.com"'
                    
                    sh 'git config user.name "Jenkins CI Engine"'
                    sh '''
                    sed -i "s|image:.*|image: vipiiin/food-delivery-app-server:${VERSION}|g" aws/angular-manifest.yml
                    '''
                    sh 'git checkout main'
                    sh 'git add .'
                    sh 'git commit -m "Update image tag to ${VERSION}"'
                    sshagent(['git-ssh'])
                    {
                        sh 'git push'
                    }
                }
            }
        }
    }
}