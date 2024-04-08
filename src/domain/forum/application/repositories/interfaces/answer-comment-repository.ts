import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment'

export interface IAnswerCommentRepository {
  create(question: AnswerComment): Promise<void>
}
