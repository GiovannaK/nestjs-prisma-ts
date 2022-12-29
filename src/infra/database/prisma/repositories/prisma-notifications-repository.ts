import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/Notification';
import { NotificationRepository } from '../../../../application/repositories/notification-repository';
import { PrismaNotificationMapper } from '../mapper/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: string): Promise<Notification> {
    throw new Error('Method not implemented.');
  }
  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const rawNotification =
      PrismaNotificationMapper.toPersistence(notification);
    await this.prismaService.notification.create({
      data: rawNotification,
    });
  }
}
