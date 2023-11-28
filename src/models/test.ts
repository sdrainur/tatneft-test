import { Question } from "src/models/question";

export interface Test {
  name: string;
  questions: Question[];
}
