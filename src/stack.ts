import { backend, frontend, useStack, Stack } from '@rebel/stack';

const stack: Stack = useStack('RebelBackend');

backend(stack, {
  // Add your environment variables here
  MESSAGE: 'Hello, World!',
  OTHER_VAR: 'Some other value',
});

frontend(stack);

// Deploy your stack
stack.deploy();

export default stack;
