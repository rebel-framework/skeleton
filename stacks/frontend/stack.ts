import { root, useEnv } from '@rebel-framework/core';
import { useStack, Stack } from '@rebel-framework/stack';
import * as S3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { RemovalPolicy } from 'aws-cdk-lib';

import {
  CodeBuildAction,
  GitHubSourceAction,
  S3DeployAction,
} from 'aws-cdk-lib/aws-codepipeline-actions';

const stack: Stack = useStack('RebelFrontend');

// Define the S3 bucket
const websiteBucket = stack.s3.bucket('RebelStaticWebsiteBucket', {
  websiteIndexDocument: 'index.html',
  publicReadAccess: false, // Since publicReadAccess is false, we need to define our own bucket policy
  removalPolicy: RemovalPolicy.DESTROY,
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
  resources: [websiteBucket.bucketArn + '/*'],
});

// Attach the bucket policy to the bucket
websiteBucket.addToResourcePolicy(bucketPolicy);

// Define the S3 bucket deployment
stack.s3.bucketDeployment(
  'RebelWebsiteDeployment',
  S3Deployment.Source.asset(root('stacks/frontend/build')),
  websiteBucket
);

// Define the CloudFront distribution
const distribution = stack.cloudFront.webDistribution({
  originConfigs: [
    {
      s3OriginSource: {
        s3BucketSource: websiteBucket,
        originAccessIdentity: originAccessIdentity, // Add the OAI here
      },
      behaviors: [{ isDefaultBehavior: true }],
    },
  ],
  defaultRootObject: 'index.html',
});

// Print out the domain name of the CloudFront distribution
stack.cdk.output('DistributionDomainName', {
  value: distribution.distributionDomainName,
});

const { env } = useEnv(root('.env'));
const { codeBuild, codePipeline, secretsManager } = stack;
const buildProject = codeBuild.pipelineProject();
const sourceOutput = codePipeline.artifact('RebelSourceArtifact');
const buildOutput = codePipeline.artifact('RebelBuildArtifact');

// Create secret to store GitHub token
const githubTokenSecretName = 'RebelGitHubToken';
secretsManager.secret(githubTokenSecretName, env('GITHUB_TOKEN'));

codePipeline.pipeline('RebelStaticWebsitePipeline', [
  {
    stageName: 'Source',
    actions: [
      new GitHubSourceAction({
        actionName: 'Checkout',
        owner: env('GITHUB_USERNAME'),
        repo: env('GITHUB_REPOSITORY'),
        // Retrieve GitHub token from SecretsManager
        oauthToken: secretsManager.value(githubTokenSecretName),
        output: sourceOutput,
        branch: 'main', // or your preferred branch
      }),
    ],
  },
  {
    stageName: 'Build',
    actions: [
      new CodeBuildAction({
        actionName: 'Build',
        project: buildProject,
        input: sourceOutput,
        outputs: [buildOutput],
      }),
    ],
  },
  {
    stageName: 'Deploy',
    actions: [
      new S3DeployAction({
        actionName: 'DeployToS3',
        input: buildOutput,
        bucket: websiteBucket,
      }),
    ],
  },
]);

export default stack;
