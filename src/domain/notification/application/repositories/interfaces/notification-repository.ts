import { Notification } from 'src/domain/notification/enterprise/entities/notification'

export interface INotificationRepository {
  create(notification: Notification): Promise<void>
}
