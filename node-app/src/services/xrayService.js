const AWSXRay = require('aws-xray-sdk');

class XRayService {
  constructor() {
    this.xray = AWSXRay;
  }

  startTrace(name, request) {
    const segment = new this.xray.Segment(name);
    const subsegment = segment.addNewSubsegment(`${name}-sub`);

    // Store both so we can close them later
    request.xraySegment = segment;
    request.xraySubsegment = subsegment;
  }

  endTrace(request) {
    if (request.xraySubsegment) {
      request.xraySubsegment.close();
    }
    if (request.xraySegment) {
      request.xraySegment.close();
    }
  }
}

module.exports = XRayService;