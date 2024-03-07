import { IQuestionRepository } from '../repositories/interfaces/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionQuestionUseCase } from './create-question'

const fakeQuestionRepository: IQuestionRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}

test('Create an question', async () => {
  const questionUseCase = new CreateQuestionQuestionUseCase(
    fakeQuestionRepository,
  )

  const { question } = await questionUseCase.execute({
    authorId: '1',
    title: 'Title',
    content: 'Content',
  })

  expect(question.content).toEqual('Content')
  expect(question.id).toBeTruthy()
})
