import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer use case tests', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  test('Deve ser possível deletar uma resposta', async () => {
    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
    })

    expect(inMemoryAnswerRepository.items.length).toBe(0)
  })

  test('Não deve ser possível deletar uma resposta a qual não o pertence', async () => {
    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
