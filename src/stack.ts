import { backend, frontend, useStack, Stack } from '@rebel/stack';

const stack: Stack = useStack('Rebel');

backend(stack, {
  // Add your environment variables here
  MESSAGE: 'Hello, World!',
});

frontend(stack);

// Deploy your stack
stack.deploy();

export default stack;
