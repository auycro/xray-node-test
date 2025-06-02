const AWS = require('aws-sdk');
const AWSXRay = require('aws-xray-sdk');
const AWSWrapper = AWSXRay.capture(AWS);

class SQSService {
    constructor(/* sqs, queueUrl */) {
        this.sqs = new AWSwrapper.SQS({
            region: process.env.AWS_REGION || 'ap-northeast-1',
        });
        this.queueUrl = process.env.SQS_QUEUE_URL;
    }

    async sendMessage(messageBody) {
        const params = {
            QueueUrl: this.queueUrl,
            MessageBody: JSON.stringify(messageBody),
        };

        try {
            return this.sqs.sendMessage(params).promise();
        } catch (error) {
            throw new Error(`Error sending message to SQS: ${error.message}`);
        }
    }

    async receiveMessage() {
        const params = {
            QueueUrl: this.queueUrl,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 10,
        };

        try {
            const data = await this.sqs.receiveMessage(params).promise();
            return data.Messages ? data.Messages : [];
        } catch (error) {
            throw new Error(`Error receiving message from SQS: ${error.message}`);
        }
    }
}

module.exports = SQSService;