// TODO повыносить все в env
pipeline {
    agent any

    environment {
        NODEJS_HOME = "${tool 'node21'}"
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${env.BRANCH_NAME ?: 'dev'}", url: 'https://github.com/uniteam31/unishare-frontend.git'
            }
        }

        stage('Run Tests and Linters') {
            steps {
                echo "Current branch: ${env.BRANCH_NAME}"

                // sh 'yarn install && yarn lint && yarn test'
            }
        }

       stage('Build Docker Image') {
           steps {
               script {
                   // Загружаем конфигурационный файл .npmrc
                  configFileProvider([configFile(fileId: 'uniteam-npmrc', variable: 'NPMRC_PATH')]) {
                      sh "cp ${NPMRC_PATH} .npmrc"
                      app = docker.build(
                          "def1s/unishare-frontend",
                          "--no-cache --build-arg BRANCH=${branchName} ."
                      )
                      sh "rm -f .npmrc" // Удаляем временный .npmrc после сборки
                  }
               }
           }
       }

        stage('Push Docker Image') {
           when {
               branch 'dev'
           }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-def1s') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy to Dev Server') {
            when {
                branch 'dev'
            }
            steps {
                sshagent(['jenkins-test_ssh']) {
                     sh 'ssh root@176.114.90.241 "/root/unishare-orchestration/deploy.sh"'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline выполнен успешно.'
        }
        failure {
            echo 'Pipeline завершился с ошибкой.'
        }
        always {
            cleanWs()
        }
    }
}

