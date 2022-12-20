import { Content } from './content';

test('It should be able to create a notification content', () => {
  const content = new Content('Hello world');
  expect(content.value).toBeTruthy();
});

test('It should be not be able to create a notification content with less than five characters', () => {
  expect(() => new Content('1234')).toThrow(
    new Error('Content must be between 5 and 240 characters long'),
  );
});

test('It should be not be able to create a notification content with more than 240 characters', () => {
  expect(() => new Content('a'.repeat(241))).toThrow(
    new Error('Content must be between 5 and 240 characters long'),
  );
});
