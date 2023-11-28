import { QuestionResult } from "src/models/question-result";

export const getCurrentQuestionResult = (
  userQuestionResults: QuestionResult[],
): QuestionResult | null => {
  if (
    !userQuestionResults.length ||
    userQuestionResults.every((questionResult) => !!questionResult.result)
  ) {
    return null;
  }

  return (
    userQuestionResults.find((answer) => !answer.result?.endDateTime) ||
    userQuestionResults[0]
  );
};
