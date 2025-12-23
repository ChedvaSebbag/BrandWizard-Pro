pipeline {
  agent any

  stages {
    stage('Build Docker Images') {
      steps {
        sh '/usr/local/bin/docker compose build'
      }
    }
  }
}