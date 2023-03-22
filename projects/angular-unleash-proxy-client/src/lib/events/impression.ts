import { BaseEvent } from './base';

export interface ImpressionEvent extends BaseEvent {
  variant?: string;
}
