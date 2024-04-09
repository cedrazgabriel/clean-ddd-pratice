import { Either, left, right } from 'src/core/either'
import { IAnswerCommentRepository } from '../repositories/interfaces/answer-comment-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, object>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: IAnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not allowed')
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({})
  }
}
