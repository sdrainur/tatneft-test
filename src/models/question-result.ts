import { Question } from "src/models/question";

//Вопрос считается отвеченным, если result !== null

export interface QuestionResult {
  id: string;
  question: Question;
  startDateTime: string | null;
  result: {
    userAnswerId: string;
    endDateTime: string;
  } | null;
}
