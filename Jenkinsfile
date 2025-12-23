pipeline {
  agent any

  environment {
    PATH = "/Applications/Docker.app/Contents/Resources/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
  }

  stages {
    stage('Build Docker Images') {
      steps {
        sh 'docker compose build'
      }
    }
  }
}