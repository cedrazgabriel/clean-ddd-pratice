import { IQuestionCommentRepository } from 'src/domain/forum/application/repositories/interfaces/question-comment-repository'
import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements IQuestionCommentRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
