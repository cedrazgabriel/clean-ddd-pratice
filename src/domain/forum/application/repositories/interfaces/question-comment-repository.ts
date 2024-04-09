import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment'

export interface IQuestionCommentRepository {
  findById(id: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
  create(questionComment: QuestionComment): Promise<void>
}
