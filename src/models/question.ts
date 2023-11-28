import { Answer } from "src/models/answer";

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  rightAnswerId: string;
}
