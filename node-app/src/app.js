const fastify = require('fastify')({ logger: true });
const routes = require('./routes/index');
//const XRayService = require('./services/xrayService');
//const xrayService = new XRayService();
//xrayService.xray.captureAWS(AWS);
const AWSXRay = require('aws-xray-sdk');
AWSXRay.setContextMissingStrategy('LOG_ERROR');
const AWSXRayNamespace = AWSXRay.getNamespace()

fastify.register(require('fastify-env'), {
  schema: {
    type: 'object',
    required: ['AWS_REGION', 'SQS_QUEUE_URL'],
    properties: {
      AWS_REGION: { type: 'string' },
      SQS_QUEUE_URL: { type: 'string' },
    },
  },
});

// fastify.addHook('onRequest', async (request, reply) => {
//   await xrayService.startTrace('sendMessage',request);
// });

// fastify.addHook('onResponse', async (request, reply) => {
//   await xrayService.endTrace(request);
// });

// fastify.addHook('onRequest', (request, reply, done) => {
//   // Start segment with dynamic name
//   //const segmentName = `${request.method} ${request.routerPath || request.url}`;
//   // Begin segment and set on request for later use
//   //const segment = AWSXRay.getSegment() || AWSXRay.beginSegment(segmentName);
//   //request.segment = segment;
//   done();
// });

fastify.addHook('onRequest', async (request, reply) => {
  await AWSXRayNamespace.runPromise(async () => {
    const segmentName = `${request.method} ${request.routerPath || request.url}`;
    const segment = new AWSXRay.Segment(segmentName);
    AWSXRay.setSegment(segment);
    request.segment = segment;
  });
});

fastify.addHook('onResponse', (request, reply, done) => {
  if (request.segment) {
    request.segment.close();
  }
  done();
});

routes.setRoutes(fastify);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();