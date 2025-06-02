# Node Fastify SQS X-Ray

This project is a Node.js application built using Fastify that integrates with AWS SQS for message queuing and AWS X-Ray for tracing. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Services](#services)
- [Logging](#logging)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/microsoft/vscode-remote-try-node.git
   cd node-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your AWS credentials and SQS queue URL.

## Usage

To start the application, run:
```
npm start
```

The server will start on the specified port (default is 3000).

## Routes

The application has the following routes:

- `POST /send`: Sends a message to the SQS queue.
- `GET /receive`: Receives messages from the SQS queue.

## Services

### SQSService

The `SQSService` class handles interactions with AWS SQS. It provides methods to send and receive messages.

### XRayService

The `XRayService` class manages AWS X-Ray tracing. It provides methods to start and end traces for monitoring application performance.

## Logging

The application uses a logger utility for logging messages at different levels (info, error, etc.). This helps in tracking application behavior and debugging issues.

## Environment Variables

The following environment variables are required:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `AWS_REGION`: The AWS region where your SQS queue is located.
- `SQS_QUEUE_URL`: The URL of the SQS queue to send and receive messages.

Make sure to set these variables in your `.env` file before running the application.