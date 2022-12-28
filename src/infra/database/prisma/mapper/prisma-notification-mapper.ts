import { Notification } from '@application/entities/Notification';

export class PrismaNotificationMapper {
  static toPersistence(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}
