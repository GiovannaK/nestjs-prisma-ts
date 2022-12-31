import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/Notification';

type Override = Partial<NotificationProps>;

export function makeNotification(overrides: Override = {}) {
  return new Notification({
    recipientId: 'some-id',
    content: new Content('Hello world'),
    category: 'email',
    ...overrides,
  });
}
