import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { EditAnswerAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerAnswerUseCase

describe('Delete answer use case tests', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerAnswerUseCase(inMemoryAnswerRepository)
  })

  test('Deve ser possível editar uma resposta', async () => {
    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    await sut.execute({
      authorId: createdAnswer.authorId.toString(),
      answerId: createdAnswer.id.toString(),
      content: 'new content',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'new content',
    })
  })

  test('Não deve ser possível editar uma resposta a qual não o pertence', async () => {
    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: createdAnswer.id.toString(),
      content: 'new content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
