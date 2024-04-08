import { IAnswerCommentRepository } from 'src/domain/forum/application/repositories/interfaces/answer-comment-repository'
import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements IAnswerCommentRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
