import { include, root, useManifest } from '@rebel/core';

export default async (args): Promise<any> => {
  const manifest = include('manifest');
  console.log(manifest);

  const { default: stack } = include('stack');
  console.log(stack);
};
