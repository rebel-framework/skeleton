import { useStack, Stack, root } from '@rebel/core';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

const stack: Stack = useStack('Rebel');

// Define the Lambda function
const lambda = stack.handler('RebelMonoLambdaFunction', {
  entry: root('src/backend/handler.ts'), // Point to your TypeScript file
  handler: 'handler', // Specify the exported handler function in your TypeScript file
  runtime: Runtime.NODEJS_18_X, // Set the runtime to Node.js 18.x
  timeout: Duration.seconds(10), // Optionally set a timeout
  memorySize: 256, // Optionally set the amount of memory allocated
  environment: {
    // Add your environment variables here
    MESSAGE: 'Hello, World!',
    OTHER_VAR: 'Some other value',
  },
});

// Create an API Gateway
const api = stack.apiGateway('RebelApi', {
  restApiName: 'RebelApiService',
  description: 'This service serves as a front for RebelMonoLambdaFunction.',
});

// Create a catch-all proxy resource
const proxyResource = api.root.addResource('{proxy+}');

// Add a ANY method to the catch-all proxy resource, connected to your Lambda function
proxyResource.addMethod('ANY', new LambdaIntegration(lambda));

// Deploy your stack
stack.deploy();

export default stack;
