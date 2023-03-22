import { IContext as UnleashContext } from 'unleash-proxy-client';

export interface BaseEvent {
  eventType: string;
  eventId: string;
  context: UnleashContext,
  enabled: boolean;
  featureName: string;
  impressionData?: boolean;
}
