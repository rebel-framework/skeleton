import { useStack, Stack } from '@rebel/core';
import { InlineCode, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

const stack: Stack = useStack('Rebel');

// Define the Lambda function
const lambda = stack.lambda('RebelMonoLambdaFunction', {
  code: new InlineCode(`
    exports.handler = async function(event, context) { 
      console.log("EVENT: \\n" + JSON.stringify(event, null, 2));
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Hello from Lambda!" })
      };
    }
  `),
  handler: 'index.handler',
  runtime: Runtime.NODEJS_18_X,
  timeout: Duration.seconds(10),
  memorySize: 256,
});

// Create an API Gateway
const api = stack.apiGateway('RebelApi', {
  restApiName: 'RebelApiService',
  description: 'This service serves as a front for RebelMonoLambdaFunction.',
});

// Add a root resource and method to the API Gateway tied to your Lambda function
stack.resource(api, 'RebelResource');
stack.method(api.root, 'ANY', new LambdaIntegration(lambda));

// Deploy your stack
stack.deploy();

export default stack;
