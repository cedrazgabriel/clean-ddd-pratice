import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { EditQuestionQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionQuestionUseCase

describe('Delete question use case tests', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionQuestionUseCase(inMemoryQuestionRepository)
  })

  test('Deve ser possível editar uma questão', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(createdQuestion)

    await sut.execute({
      authorId: createdQuestion.authorId.toString(),
      questionId: createdQuestion.id.toString(),
      content: 'new content',
      title: 'new title',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      content: 'new content',
      title: 'new title',
    })
  })

  test('Não deve ser possível editar uma questão a qual não o pertence', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(createdQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: createdQuestion.id.toString(),
      content: 'new content',
      title: 'new title',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
