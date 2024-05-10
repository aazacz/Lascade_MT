# Lascade Machine Task

## Overview

The goal of this project is to develop a robust and scalable API using Node.js. The API will handle user management, authentication, CSV file uploads, processing, database operations, and deployment.
## Installations

No installation of packages are required. The project is deployed in AWS server



## Prerequisites

1. Postman
2. Pem Key for secure access to the EC2 Server
3. **PEM File is uploaded in the project root folder**

## Packages Used / Software Dependencies
1. **Multer**: Middleware for handling multipart/form-data, typically used for file uploads in Node.js applications.
2. **Bull**: A Redis-backed queue for Node.js, used for managing background jobs and task processing.
3. **Bcrypt**: A library for hashing passwords and performing password hashing functions in Node.js.
4. **csvtojson**: A library for converting CSV files to JSON format in Node.js.
5. **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWT) for authentication and authorization in Node.js applications.

## MongoDB Installation and Usage
MongoDB is installed on an EC2 instance. To access the MongoDB server:
1. **SSH into the EC2 Instance**: Use SSH to connect to the EC2 instance where MongoDB is installed.
```
ssh -i your-key.pem ec2-user@ec2-instance-public-ip
```
2. **Access MongoDB Shell**: Once connected, use the mongosh command to access the MongoDB server.
```
mongosh
```


## Server-Side Logs
Server-side logs can be viewed using PM2, a process manager for Node.js applications:
1. **View Logs**: Use the following command to view logs for your application:
```
pm2 logs
```

## Redis Docker Installation
Redis is installed using Docker on the ECS instance.
1. **SSH into the EC2 Instance**: Use SSH to connect to the EC2 instance where MongoDB is installed.
```
ssh -i your-key.pem ec2-user@ec2-instance-public-ip
```

2. **Restart Docker if necessary**: if you want to restart Docker itself, you can use the following command:
```
sudo systemctl restart docker
```


## Usage
Access the web app at **http://51.20.3.209:3000/** using postman


Use the pem key to login in to the EC2
### Public DNS to EC2 given below
 ```
ssh -i "Lascade-Node_project.pem" ubuntu@ec2-51-20-3-209.eu-north-1.compute.amazonaws.com
```

Follow these steps in postman👇👇

1. Create your render account in https://render.com/
2. Connect your github to render and give the project permission for that
3. Then create a new Web Service and add your repo (your repo must be look like this repo's folder structure like frontend and backend both in that repo)



## Running the API in Postman.

1. In the database sample user accounts are already created
2. password is always **qwerty**
3. For logging in use the following account types

| Authorised Account | |
| --- | --- |
| name | abhilash |
| email | temp@gmail.com |
| password | qwerty |
| authenticated | true |


| Unauthorised Account | |
| --- | --- |
| name | abhilash |
| email | temp1@gmail.com |
| password | qwerty |
| authenticated | false |

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

