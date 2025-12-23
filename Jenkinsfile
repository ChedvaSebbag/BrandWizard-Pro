pipeline {
  agent any

  stages {

    stage('Build Docker Images') {
      steps {
        sh '/usr/local/bin/docker compose build'
      }
    }

    stage('Run Containers') {
      steps {
        sh '/usr/local/bin/docker compose up -d'
      }
    }

  }
}