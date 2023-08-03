import { useManifest } from '@rebel/core';

export default async (args): Promise<any> => {
  //   const { default: manifest } = require(root('bin/manifest'));
  const { environment: env } = useManifest();
  //   console.log(manifest);
  console.log(env);
};
