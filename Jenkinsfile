pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '629161161381'
        AWS_REGION     = 'ap-south-1'
        ECR_REGISTRY   = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        CLUSTER_NAME   = 'streaming-app-cluster'
        
        FRONTEND_REPO  = "streaming-app-frontend"
        HELLO_REPO     = "streaming-app-hello-service"
        PROFILE_REPO   = "streaming-app-profile-service"
        
        IMAGE_TAG      = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'feature/orchestration', 
                    url: 'https://github.com/vivek-rajendran/SampleMERNwithMicroservices.git'
            }
        }

        stage('AWS ECR Login & EKS Config') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials-vivek'
                ]]) {
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                    sh "aws eks update-kubeconfig --region ${AWS_REGION} --name ${CLUSTER_NAME}"
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    // 1. Frontend Image
                    sh "docker build -t ${ECR_REGISTRY}/${FRONTEND_REPO}:${IMAGE_TAG} -t ${ECR_REGISTRY}/${FRONTEND_REPO}:latest ./frontend"
                    sh "docker push ${ECR_REGISTRY}/${FRONTEND_REPO}:${IMAGE_TAG}"
                    sh "docker push ${ECR_REGISTRY}/${FRONTEND_REPO}:latest"

                    // 2. Hello Service Image
                    sh "docker build -t ${ECR_REGISTRY}/${HELLO_REPO}:${IMAGE_TAG} -t ${ECR_REGISTRY}/${HELLO_REPO}:latest ./backend/helloService"
                    sh "docker push ${ECR_REGISTRY}/${HELLO_REPO}:${IMAGE_TAG}"
                    sh "docker push ${ECR_REGISTRY}/${HELLO_REPO}:latest"

                    // 3. Profile Service Image
                    sh "docker build -t ${ECR_REGISTRY}/${PROFILE_REPO}:${IMAGE_TAG} -t ${ECR_REGISTRY}/${PROFILE_REPO}:latest ./backend/profileService"
                    sh "docker push ${ECR_REGISTRY}/${PROFILE_REPO}:${IMAGE_TAG}"
                    sh "docker push ${ECR_REGISTRY}/${PROFILE_REPO}:latest"
                }
            }
        }

        stage('Deploy to EKS via Helm') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials-vivek'
                ]]) {
                    sh """
                    helm upgrade --install mern-release ./mern-chart \
                      --set images.frontend="${ECR_REGISTRY}/${FRONTEND_REPO}:${IMAGE_TAG}" \
                      --set images.hello="${ECR_REGISTRY}/${HELLO_REPO}:${IMAGE_TAG}" \
                      --set images.profile="${ECR_REGISTRY}/${PROFILE_REPO}:${IMAGE_TAG}"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "CI/CD Pipeline executed successfully! EKS updated with build #${BUILD_NUMBER}."
            sh "aws sns publish --topic-arn arn:aws:sns:us-east-1:629161161381:mern-deployment-notifications --message 'SUCCESS: Build #${BUILD_NUMBER} for MERN Microservices deployed successfully to EKS!'"
        }
        failure {
            echo "Pipeline failed. Check Console Output for details."
            sh "aws sns publish --topic-arn arn:aws:sns:us-east-1:629161161381:mern-deployment-notifications --message 'FAILURE: Build #${BUILD_NUMBER} for MERN Microservices failed during execution!'"
        }
    }
}