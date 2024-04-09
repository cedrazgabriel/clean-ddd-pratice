import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment'

export interface IAnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
  create(answerComment: AnswerComment): Promise<void>
}
