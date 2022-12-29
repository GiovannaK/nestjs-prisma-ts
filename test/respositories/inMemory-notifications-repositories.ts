import { Notification } from 'src/application/entities/Notification';
import { NotificationRepository } from 'src/application/repositories/notification-repository';

export class InMemorynotificationRepository implements NotificationRepository {
  async findById(id: string): Promise<Notification> {
    const notification = this.notifications.find((item) => item.id === id);

    if (!notification) {
      return null;
    }

    return notification;
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex > 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
