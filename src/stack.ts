import {
  useBackend,
  useFrontend,
  usePipeline,
  useStack,
  Stack,
} from '@rebel/stack';

const stack: Stack = useStack('Rebel');

useBackend(stack, {
  // Add your environment variables here
  MESSAGE: 'Hello, World!',
});

const { siteBucket } = useFrontend(stack);

usePipeline(stack, siteBucket);

// Deploy your stack
stack.deploy();

export default stack;
