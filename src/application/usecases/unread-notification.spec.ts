import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/Notification';
import { makeNotification } from '../../factories/notification-factory';
import { InMemorynotificationRepository } from '../../../test/respositories/inMemory-notifications-repositories';
import { CancelNotification } from './cancel-notification';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';

describe('unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification that does not exist', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    await expect(
      unreadNotification.execute({
        notificationId: 'some-id',
      }),
    ).rejects.toEqual(new Error('Notification not found.'));
  });
});
