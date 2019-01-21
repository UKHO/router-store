pipeline {
  agent {
    docker {
      image 'base-nodejs-docker:1-RELEASE'
      args  '--shm-size="2g"'
    }
  }
  environment {
    HOME = '/tmp'
  }
  options {
    skipStagesAfterUnstable()
  }
  stages {
    stage('Test and Build') {
      parallel {
        stage('Lint') {
          steps {
            sh 'yarn'
            sh 'yarn run lint'
          }
        }
        stage('Unit Test') {
          steps {
            sh 'yarn'
            sh 'yarn run test'
          }
        }
        stage('Build') {
          steps {
            sh 'yarn'
            sh 'yarn run build'
            stash includes: 'dist/', name: 'dist'
          }
        }
      }
    }
    stage('Publish') {
      when {
        environment name: 'DEPLOY_STAGE', value: 'RELEASE'
      }
      environment {
        NEXUS_CREDENTIALS = credentials('docker_push')
      }
      steps {
        unstash 'dist'
        sh 'echo -n "_auth=" > .npmrc'
        sh 'echo -n "$NEXUS_CREDENTIALS_USR:$NEXUS_CREDENTIALS_PSW" | openssl base64 >> .npmrc'
        sh 'yarn publish dist/router-store --non-interactive'
      }
    }
  }
}
