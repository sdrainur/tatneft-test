import { QuestionResult } from "src/models/question-result";

export const isRightAnswer = (answer: QuestionResult) =>
  !!answer.result?.endDateTime &&
  answer.result.userAnswerId === answer.question.rightAnswerId;
