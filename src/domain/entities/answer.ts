import { EntityBase } from "../../core/entities/entity";

interface AnswerProps {
    content: string
    authorId: string,
    questionId: string,
}

export class Answer extends EntityBase<AnswerProps> {
    get content() {
        return this.props.content
    }
}