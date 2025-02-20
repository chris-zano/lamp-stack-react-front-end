#!/bin/bash

DOCKER_USERNAME="chrisncs"
IMAGE_NAME="php-server"
TAG="latest"

if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Installing..."
    sudo apt update && sudo apt install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Installing..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo "Logging in to Docker Hub..."
docker login -u "$DOCKER_USERNAME"

echo "Building Docker image..." 
docker-compose build

echo "Pushing image to Docker Hub..."
docker push "$DOCKER_USERNAME/$IMAGE_NAME:$TAG"

echo "Deployment completed!"
