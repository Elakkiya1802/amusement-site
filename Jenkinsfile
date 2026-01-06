pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_URI = "848837614120.dkr.ecr.ap-south-1.amazonaws.com/amusement-site"
    CLUSTER_NAME = "amusement-cluster"
    SERVICE_NAME = "amusement-service"
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
            url: ' https://github.com/Elakkiya1802/amusement-site.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t amusement-site .'
      }
    }

    stage('Login & Push to ECR') {
      steps {
        sh '''
          aws ecr get-login-password --region $AWS_REGION \
          | docker login --username AWS --password-stdin $ECR_URI

          docker tag amusement-site:latest $ECR_URI:latest
          docker push $ECR_URI:latest
        '''
      }
    }

    stage('Deploy to ECS Fargate') {
      steps {
        sh '''
          aws ecs update-service \
          --cluster $CLUSTER_NAME \
          --service $SERVICE_NAME \
          --force-new-deployment
        '''
      }
    }
  }
}
