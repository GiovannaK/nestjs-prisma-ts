import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/Notification';
import { InMemorynotificationRepository } from '../../../test/respositories/inMemory-notifications-repositories';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      recipientId: 'some-id',
      content: new Content('Hello world'),
      category: 'email',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    await expect(
      cancelNotification.execute({
        notificationId: 'some-id',
      }),
    ).rejects.toEqual(new Error('Notification not found.'));
  });
});
