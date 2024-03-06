import { AnswerQuestionUseCase } from './answer-question'
import { IAnswersRepository } from '../repositories/interfaces/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: IAnswersRepository = {
  create: async (answer: Answer) => {},
}

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
