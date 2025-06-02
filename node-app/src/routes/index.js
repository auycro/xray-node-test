const SQSService = require('../services/sqsService');
const XRayService = require('../services/xrayService');

function setRoutes(fastify) {
    fastify.post('/send', async (request, reply) => {
        const { message } = request.body;
        const sqsService = new SQSService();
        //const xrayService = new XRayService();

        //xrayService.startTrace('sendMessage', request);
        try {
            await sqsService.sendMessage(message);
            reply.send({ status: 'Message sent successfully' });
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Failed to send message' });
        } finally {
            //TODO:
            //xrayService.endTrace(request);
        }
    });

    fastify.get('/receive', async (request, reply) => {
        const sqsService = new SQSService();
        const xrayService = new XRayService();

        xrayService.startTrace('receiveMessage', request);
        try {
            const messages = await sqsService.receiveMessage();
            reply.send(messages);
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Failed to receive messages' });
        } finally {
            xrayService.endTrace(request);
        }
    });
}

module.exports = { setRoutes };