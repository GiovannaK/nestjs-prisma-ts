import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/Notification';
import { makeNotification } from '../../factories/notification-factory';
import { InMemorynotificationRepository } from '../../../test/respositories/inMemory-notifications-repositories';
import { CancelNotification } from './cancel-notification';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    await expect(
      readNotification.execute({
        notificationId: 'some-id',
      }),
    ).rejects.toEqual(new Error('Notification not found.'));
  });
});
