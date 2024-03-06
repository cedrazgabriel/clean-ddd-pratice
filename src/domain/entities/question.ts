import { Slug } from "./value-objects/slug";
import { EntityBase } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";

interface QuestionProps {
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId
    slug: Slug 
    title: string
    content: string
    createdAt: Date
    updatedAt?: Date
}

export class Question extends EntityBase<QuestionProps>{
    static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityId) {
        const question = new Question({
            ...props,
            createdAt: new Date()
        }, id)

        return question
    }
}