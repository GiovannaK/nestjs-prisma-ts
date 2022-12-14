import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Hello world');
    expect(content.value).toBeTruthy();
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
