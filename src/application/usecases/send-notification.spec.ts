import { Notification } from '../entities/Notification';
import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

const notificationRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send notification', () => {
  it('should be able to create a notification', async () => {
    const sendNotification = new SendNotification(notificationRepository);
    await sendNotification.execute({
      category: 'email',
      content: 'Hello world',
      recipientId: 'some-id',
    });

    expect(notifications).toHaveLength(1);
  });
});
