import { CancelNotification } from '@application/usecases/cancel-notification';
import { CountRecipientNotification } from '@application/usecases/count-recipient-notifications';
import { GetRecipientNotification } from '@application/usecases/get-recipient-notifications';
import { ReadNotification } from '@application/usecases/read-notification';
import { UnreadNotification } from '@application/usecases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/usecases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/norifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
