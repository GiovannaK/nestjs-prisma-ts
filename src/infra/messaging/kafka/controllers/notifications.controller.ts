import { SendNotification } from '@application/usecases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  category: string;
  content: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  @EventPattern('notifications.send-notification')
  async handleSendNotification(@Payload() data: SendNotificationPayload) {
    await this.sendNotification.execute({
      category: data.category,
      content: data.content,
      recipientId: data.recipientId,
    });
  }
}
