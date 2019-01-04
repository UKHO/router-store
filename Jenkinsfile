pipeline {
  agent none
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
          agent {
            docker {
              image 'circleci/node:10.15.0-stretch-browsers'
              args  '--shm-size="2g"'
            }
          }
          steps {
            sh 'yarn'
            sh 'yarn run lint'
          }
        }
        stage('Unit Test') {
          agent {
            docker {
              image 'circleci/node:10.15.0-stretch-browsers'
              args  '--shm-size="2g"'
            }
          }
          steps {
            sh 'yarn'
            sh 'yarn run test'
          }
        }
        stage('Build') {
          agent {
            docker {
              image 'circleci/node:10.15.0-stretch-browsers'
              args  '--shm-size="2g"'
            }
          }
          steps {
            sh 'yarn'
            sh 'yarn run build'
            stash includes: 'dist/', name: 'dist'
          }
        }
      }
    }
    stage('Publish') {
      agent {
        docker {
          image 'circleci/node:10.15.0-stretch-browsers'
          args  '--shm-size="2g"'
        }
      }
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
