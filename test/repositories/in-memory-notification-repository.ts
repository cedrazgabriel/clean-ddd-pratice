import { INotificationRepository } from 'src/domain/notification/application/repositories/interfaces/notification-repository'
import { Notification } from 'src/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements INotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}
