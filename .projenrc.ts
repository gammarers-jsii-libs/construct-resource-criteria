import { ProjenJsiiProject } from '@gammarers/projen-projects';
const project = new ProjenJsiiProject({
  name: 'construct-resource-criteria',
  description:
    'Helpers for CDK construct resource criteria, including ConstructResourceTagCriteria validation.',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers-jsii-libs/construct-resource-criteria.git',
  deps: [
    'aws-cdk-lib@^2.232.0',
  ],
  devDeps: [
    '@gammarers/projen-projects@^0.6.1',
  ],
  keywords: [
    'aws',
    'cdk',
    'construct',
    'resource',
    'criteria',
  ],
  releaseToNpm: true,
  npmTrustedPublishing: true,
});
project.synth();
