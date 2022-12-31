import { makeNotification } from '../../factories/notification-factory';
import { InMemorynotificationRepository } from '../../../test/respositories/inMemory-notifications-repositories';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get notification', () => {
  it('should be able to get notifications by recipient', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const getRecipentNotifications = new GetRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'some-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'some-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'c-id' }),
    );

    const { notifications } = await getRecipentNotifications.execute({
      recipientId: 'some-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'some-id' }),
        expect.objectContaining({ recipientId: 'some-id' }),
      ]),
    );
  });
});
