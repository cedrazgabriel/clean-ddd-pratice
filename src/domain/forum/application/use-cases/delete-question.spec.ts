import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionQuestionUseCase } from './delete-question'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionQuestionUseCase

describe('Delete question use case tests', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionQuestionUseCase(inMemoryQuestionRepository)
  })

  test('Deve ser possível deletar uma questão', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(createdQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(inMemoryQuestionRepository.items.length).toBe(0)
  })

  test('Não deve ser possível deletar uma questão a qual não o pertence', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(createdQuestion)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionId: 'question-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
