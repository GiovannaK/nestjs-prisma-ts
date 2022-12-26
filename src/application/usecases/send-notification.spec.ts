import { InMemorynotificationRepository } from '../../../test/respositories/inMemory-notifications-repositories';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to create a notification', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const { notification } = await sendNotification.execute({
      category: 'email',
      content: 'Hello world',
      recipientId: 'some-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
