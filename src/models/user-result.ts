import { QuestionResult } from "src/models/question-result";

//Тест считается пройденным, если endDateTime !== null

export interface UserResult {
  id: string;
  testName: string;
  questionResults: QuestionResult[];
  startDateTime: Date;
  endDateTime: Date | null;
}
