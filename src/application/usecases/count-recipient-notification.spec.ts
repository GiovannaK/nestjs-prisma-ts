import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/Notification';
import { InMemorynotificationRepository } from '../../../test/respositories/inMemory-notifications-repositories';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count notification', () => {
  it('should be able to count notifications by recipient', async () => {
    const notificationsRepository = new InMemorynotificationRepository();
    const countRecipentNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'some-id',
        content: new Content('Hello world'),
        category: 'email',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'a-id',
        content: new Content('Hello world'),
        category: 'email',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'some-id',
        content: new Content('Hello world'),
        category: 'email',
      }),
    );

    const { count } = await countRecipentNotification.execute({
      recipientId: 'some-id',
    });

    expect(count).toEqual(2);
  });
});
