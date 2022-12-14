import { makeNotification } from '../../factories/notification-factory';
import { InMemorynotificationRepository } from '../../../test/respositories/inMemory-notifications-repositories';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count notification', () => {
  it('should be able to count notifications by recipient', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const countRecipentNotification = new CountRecipientNotification(
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

    const { count } = await countRecipentNotification.execute({
      recipientId: 'some-id',
    });

    expect(count).toEqual(2);
  });
});
