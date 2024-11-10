import { IConfig } from 'unleash-proxy-client';

export const TOGGLE_NAMES = {
  FEATURE_A: 'featureA',  // let's assume this is enabled
  FEATURE_B: 'featureB',  // let's assume this is disabled
  FEATURE_C: 'featureC',  // let's assume this is enabled
} as const;

export const EXAMPLE_CONFIG: IConfig = {
  url: 'http://localhost:4200/assets/flags.json',
  appName: 'staging',
  clientKey: 'MY_UNLEASH_PROXY_SECRETS',
};
