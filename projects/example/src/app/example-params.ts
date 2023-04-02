import { IConfig } from 'unleash-proxy-client';

export const TOGGLE_NAME = '_';

export const EXAMPLE_CONFIG: IConfig = {
  url: 'http://localhost:3030/proxy',
  appName: 'staging',
  clientKey: 'MY_UNLEASH_PROXY_SECRETS',
};
