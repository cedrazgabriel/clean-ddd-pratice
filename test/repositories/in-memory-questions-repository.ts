import { IQuestionRepository } from 'src/domain/forum/application/repositories/interfaces/questions-repository'
import { Question } from 'src/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements IQuestionRepository {
  public items: Question[] = []
  async create(question: Question): Promise<void> {
    this.items.push(question)
  }
}
