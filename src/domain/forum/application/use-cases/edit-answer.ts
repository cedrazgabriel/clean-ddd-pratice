import { IAnswersRepository } from '../repositories/interfaces/answer-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

interface EditAnswerUseCaseResponse {}

export class EditAnswerAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('You are not the author of this answer')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {}
  }
}
