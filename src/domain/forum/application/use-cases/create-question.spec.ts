import { CreateQuestionQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionQuestionUseCase

describe('Create question tests', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionQuestionUseCase(inMemoryQuestionRepository)
  })

  test('Deve ser possível criar uma questão', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Title',
      content: 'Content',
    })

    expect(question.content).toEqual('Content')
    expect(question.id).toBeTruthy()
  })
})
