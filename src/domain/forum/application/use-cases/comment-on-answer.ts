import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswersRepository } from '../repositories/interfaces/answer-repository'
import { IAnswerCommentRepository } from '../repositories/interfaces/answer-comment-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerAnswerUseCase {
  constructor(
    private answerRepository: IAnswersRepository,
    private answerCommentRepository: IAnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
