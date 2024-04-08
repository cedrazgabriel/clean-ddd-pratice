import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment'

export interface IQuestionCommentRepository {
  create(question: QuestionComment): Promise<void>
}
