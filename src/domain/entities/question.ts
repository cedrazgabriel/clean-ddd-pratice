import { Slug } from "./value-objects/slug";
import { EntityBase } from "../../core/entities/entity";
interface QuestionProps {
    title: string
    content: string
    authorId: string
    slug: Slug 
}
export class Question extends EntityBase<QuestionProps>{
}