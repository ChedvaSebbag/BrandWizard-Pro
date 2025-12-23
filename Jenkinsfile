


pipeline {
  agent any

  environment {
    PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
  }

  stages {

    stage('Build Docker Images') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Run Containers') {
      steps {
        sh 'docker compose up -d'
      }
    }

  }
}
