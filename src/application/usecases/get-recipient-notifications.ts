import { Notification } from '@application/entities/Notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}
  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
