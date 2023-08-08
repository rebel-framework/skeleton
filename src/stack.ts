import { root } from '@rebel/core';
import { useStack, Stack } from '@rebel/stack';
import * as S3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

const stack: Stack = useStack('RebelBackend');

const lambda = stack.lambda.nodeFunction('RebelMonoLambda', {
  entry: root('src/backend/handler.ts'),
  environment: {
    // Add your environment variables here
    MESSAGE: 'Hello, World!',
    OTHER_VAR: 'Some other value',
  },
});

// Create an API Gateway
const api = stack.apiGateway.restApi('RebelApiGateway', {
  restApiName: 'RebelApiService',
  description: 'This service serves as a front for RebelMonoLambdaFunction.',
});

// Create a catch-all proxy resource
stack.apiGateway.proxyResource(api, lambda);

// Define the S3 bucket
const siteBucket = stack.s3.bucket('RebelStaticWebsiteBucket', {
  websiteIndexDocument: 'index.html',
  publicReadAccess: false, // Since publicReadAccess is false, we need to define our own bucket policy
});

// Define the Origin Access Identity
const originAccessIdentity = stack.cloudFront.originAccessIdentity(
  'RebelOriginAccessIdentity'
);

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
stack.s3.bucketDeployment(
  'RebelWebsiteDeployment',
  S3Deployment.Source.asset(root('src/frontend')),
  siteBucket
);

// Define the CloudFront distribution
const distribution = stack.cloudFront.webDistribution({
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
stack.cdk.output('DistributionDomainName', {
  value: distribution.domainName,
});

// Deploy your stack
stack.deploy();

export default stack;
