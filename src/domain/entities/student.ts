import { EntityBase } from "../../core/entities/entity";

interface StudentProps {
    name: string
}
export class Student extends EntityBase<StudentProps> {
}