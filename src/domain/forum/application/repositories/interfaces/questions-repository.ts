import { Question } from '../../../enterprise/entities/question'

export interface IQuestionRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
