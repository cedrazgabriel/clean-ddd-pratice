import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { ChoseQuestionBestAnswerUseCase } from './chose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: ChoseQuestionBestAnswerUseCase

describe('Chose best answer to question use case tests', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new ChoseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository,
    )
  })

  test('Deve ser possível definir uma melhor resposta para uma questão', async () => {
    const createdQuestion = makeQuestion({
      authorId: new UniqueEntityId(),
    })

    await inMemoryQuestionRepository.create(createdQuestion)

    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId(),
        questionId: createdQuestion.id,
      },
      new UniqueEntityId(),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    await sut.execute({
      authorId: createdQuestion.authorId.toString(),
      answerId: createdAnswer.id.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(
      createdAnswer.id,
    )
  })

  test('Não deve ser possível definir uma melhor resposta de uma pergunta a qual não o pertence', async () => {
    const createdQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionRepository.create(createdQuestion)

    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId(),
        questionId: createdQuestion.id,
      },
      new UniqueEntityId(),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: createdAnswer.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
