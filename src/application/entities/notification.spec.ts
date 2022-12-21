import { Content } from './content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('should be able to create a new notification', () => {
    const notification = new Notification({
      content: new Content('Hello world'),
      category: 'email',
      recipientId: 'some-id',
    });

    expect(notification).toBeInstanceOf(Notification);
  });

  it('should be not be able to create a notification content w less than five characters', () => {
    expect(() => new Content('1234')).toThrow(
      new Error('Content must be between 5 and 240 characters long'),
    );
  });

  it('should be not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow(
      new Error('Content must be between 5 and 240 characters long'),
    );
  });
});
