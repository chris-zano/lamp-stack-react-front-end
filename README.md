# LAMP Stack Deployment on AWS

## Overview
This project deploys a **LAMP stack** (Linux, Apache, MySQL, PHP) in **AWS** with a **React frontend** hosted on **AWS Amplify**. The backend infrastructure is secured within a **VPC**, ensuring high availability, scalability, and security.

## Architecture
The infrastructure is designed to be **highly available** and **scalable** with the following components:

- **React Frontend (AWS Amplify)**: The client-side application is deployed and managed using AWS Amplify, providing CI/CD and easy updates.
- **VPC**: The backend services are contained within an AWS Virtual Private Cloud (VPC) with multiple **Availability Zones (AZs)**.
- **Elastic Load Balancer (ELB)**: Routes traffic to backend servers, ensuring even distribution and fault tolerance.
- **Auto Scaling Group (ASG)**: Automatically scales backend Apache-PHP instances based on demand.
- **Apache-PHP Servers**: Handle backend logic, hosted in **private subnets** for security.
- **RDS MySQL Database**: A managed MySQL database in a **private subnet**, only accessible by backend servers.

## Deployment Steps
### 1. Frontend Deployment (React on AWS Amplify)
1. Connect the React project to AWS Amplify.
2. Enable hosting and configure CI/CD.
3. Deploy the application.

### 2. Backend Infrastructure (AWS Services)
#### Step 1: Set Up the VPC
- Create a **VPC** with **two public and two private subnets**.
- Deploy **NAT Gateway** in public subnets for private subnet internet access.

#### Step 2: Configure ELB & Auto Scaling Group
- Set up an **Elastic Load Balancer (ELB)** to distribute traffic.
- Configure an **Auto Scaling Group (ASG)** with EC2 instances running Apache and PHP in private subnets.

#### Step 3: Deploy the Apache-PHP Servers
- EC2 instances run in **private subnets**.
- They use a **Dockerized** Apache-PHP environment.
- EC2 User Data ensures each instance pulls the latest Docker image from **Docker Hub**.

#### Step 4: Set Up RDS MySQL Database
- Deploy an **RDS MySQL instance** in a **private subnet**.
- Security groups allow access only from backend servers.

## Configuration Details
### EC2 User Data Script (Dockerized Apache-PHP)
```bash
#!/bin/bash
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
sudo docker pull chrisncs/php-server:latest
sudo docker run -d --name php-server -p 80:80 chrisncs/php-server:latest
```

### Security Considerations
- **Frontend Security**: Amplify enforces HTTPS.
- **Backend Security**:
  - EC2 instances in private subnets.
  - ELB handles public traffic.
  - Security groups restrict access to only necessary components.
- **Database Security**:
  - RDS runs in a private subnet.
  - Only accessible from backend EC2 instances.
  - IAM roles and parameter groups for additional security.

## Monitoring & Scaling
- **Auto Scaling**: Ensures high availability and scales instances dynamically.
- **CloudWatch Monitoring**: Tracks logs, CPU usage, and response times.
- **ALB Health Checks**: Detect and replace unhealthy instances.

## Conclusion
This deployment ensures **scalability, security, and reliability** for a modern web application using AWS services. 🚀

