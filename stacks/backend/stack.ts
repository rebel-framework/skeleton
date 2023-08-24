import { root } from '@rebel-framework/core';
import { useStack, Stack } from '@rebel-framework/stack';

const stack: Stack = useStack('RebelBackend');

// Create the mono lambda function
const lambda = stack.lambda.nodeFunction('RebelMonoLambda', {
  entry: root('stacks/backend/src/handler.ts'),
  handler: 'handler',
  environment: {
    // Add your environment variables here
    MESSAGE: 'Hello, World!',
  },
});

// Create an API Gateway
const api = stack.apiGateway.restApi('RebelApiGateway', {
  restApiName: 'RebelApiService',
  description: 'This service serves as a front for RebelMonoLambdaFunction.',
});

// Create a catch-all proxy resource
stack.apiGateway.proxyResource(api, lambda);

// Deploy your stack
stack.deploy();

export default stack;
