import { IAnswerCommentRepository } from 'src/domain/forum/application/repositories/interfaces/answer-comment-repository'
import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements IAnswerCommentRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) return null

    return answerComment
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
