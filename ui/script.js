pipeline {
    agent {
    docker { image 'node' }
    }
    stages {
        stage('Build') {
            steps {
                sh 'git clone https://github.com/MoeedthePessimist/devops-app.git'
                sh '''
                cd devops-app
                cd ui
                npm cache clean --force 
                npm install
                npm run build
                cd ..
                cd api
                npm install
                npm run dev
                '''
            }
        }
        // stage('Test') {
        //     steps {
        //         sh '''
        //         . .venv/bin/activate
        //         python run.py
        //         '''
        //         }
        //     }
        // }
    }
}