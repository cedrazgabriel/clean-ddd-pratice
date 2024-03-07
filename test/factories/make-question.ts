import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from 'src/domain/forum/enterprise/entities/question'

// O partial no typescript pega uma interface ou tipo e torna suas propriedades em opcionais.
export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'Example question',
    authorId: new UniqueEntityId('1'),
    content: 'Test content',
    ...override,
  })

  return question
}
