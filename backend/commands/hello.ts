import { Command } from '@rebel/core';

export const hello: Command = async (args: string[]) => {
  console.log('Hello!');
};
