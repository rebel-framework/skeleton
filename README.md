# Skeleton

TODO:
[x] Deploy command to build handler before deploying? - Not necessary thanks to builtin cdk functions
[x] Deploy frontend stack
[x] Ability to destroy stacks (cdk destroy --app ...)
[x] Refactor useStack to be more modular
[x] Publish package to npm
[x] Turn `skeleton` into a monorepo
[ ] Ajudst framework expectations to new structure (in progress)
[ ] `useEnv` should use default `filePath = root('.env')` if none provided
[ ] Update deploy command to take a `stack` parameter
[ ] Move `eslint` config out of package.json
[ ] Move `prettier` config out of package.json
[ ] Add Pipeline to automatically deploy on push to xxx branch
[ ] Add github workflows
[ ] Attach domain name to deployment
[ ] Deploy DynamoDB table and experiment with single table design pattern
[ ] Local development workflow
[ ] Update retention log based on environment
[ ] Ensure there is an alarm for costs (optional but encouraged)
[ ] Add test coverage
[ ] Improve Windows support
