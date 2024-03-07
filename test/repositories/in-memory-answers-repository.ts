import { IAnswersRepository } from 'src/domain/forum/application/repositories/interfaces/answer-repository'
import { Answer } from 'src/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements IAnswersRepository {
  public items: Answer[] = []
  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}
