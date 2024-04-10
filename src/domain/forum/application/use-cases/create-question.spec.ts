import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
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
    const result = await sut.execute({
      authorId: '1',
      title: 'Title',
      content: 'Content',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
