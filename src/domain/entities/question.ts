import { Slug } from "./value-objects/slug";
import { EntityBase } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface QuestionProps {
    title: string
    content: string
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId 
    slug: Slug
    createdAt: Date
    updatedAt?: Date
}

export class Question extends EntityBase<QuestionProps>{
}