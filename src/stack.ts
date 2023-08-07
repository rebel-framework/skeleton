import { useStack, Stack, root } from '@rebel/core';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as S3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

const stack: Stack = useStack('Rebel');

// Define the Lambda function
const lambda = stack.lambda('RebelLambda', {
  entry: root('src/backend/handler.ts'), // Point to your TypeScript file
  // entry: root('node_modules/@rebel/core/src/handler.ts'), // Point to your TypeScript file
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

// Define the S3 bucket
const siteBucket = stack.bucket('RebelWebsiteBucket', {
  websiteIndexDocument: 'index.html',
  publicReadAccess: false, // Since publicReadAccess is false, we need to define our own bucket policy
});

// Define the Origin Access Identity
const originAccessIdentity = stack.originAccessIdentity('OAI');

// Define a bucket policy to allow CloudFront to access the bucket
const bucketPolicy = new PolicyStatement({
  actions: ['s3:GetObject'],
  effect: Effect.ALLOW,
  principals: [originAccessIdentity.grantPrincipal],
  resources: [siteBucket.bucketArn + '/*'],
});

// Attach the bucket policy to the bucket
siteBucket.addToResourcePolicy(bucketPolicy);

// Define the S3 bucket deployment
stack.bucketDeployment(
  'RebelWebsiteDeployment',
  S3Deployment.Source.asset(root('src/frontend')),
  siteBucket
);

// Define the CloudFront distribution
const distribution = stack.cloudFrontWebDistribution({
  originConfigs: [
    {
      s3OriginSource: {
        s3BucketSource: siteBucket,
        originAccessIdentity: originAccessIdentity, // Add the OAI here
      },
      behaviors: [{ isDefaultBehavior: true }],
    },
  ],
  defaultRootObject: 'index.html',
});

// Print out the domain name of the CloudFront distribution
stack.output('DistributionDomainName', {
  value: distribution.domainName,
});

// Deploy your stack
stack.deploy();

export default stack;
