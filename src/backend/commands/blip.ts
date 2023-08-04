import { include, root, useConfig, env } from '@rebel/core';

export default async (args): Promise<any> => {
  const config = useConfig();
  console.log(config.aws.region);
};
