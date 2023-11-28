import "src/index.scss";
import "src/components/test-content/components/test-info/test-info.component.scss";
import { UserResult } from "src/models/user-result";
import { getCurrentQuestionResult } from "src/utils/getCurrentQuestionResult";
import { useEffect, useState } from "react";
import { QuestionResult } from "src/models/question-result";
import { isRightAnswer } from "src/utils/is-right-answer";

export function TestInfoComponent({ result }: { result: UserResult | null }) {
  const [currentAnswer, setCurrentAnswer] = useState<QuestionResult | null>(
    result ? getCurrentQuestionResult(result.questionResults) : null,
  );

  const [resultPercentage, setResultPercentage] = useState<number>();

  useEffect(() => {
    setCurrentAnswer(
      result ? getCurrentQuestionResult(result.questionResults) : null,
    );
  }, [result]);

  useEffect(() => {
    if (!result) {
      return;
    }

    setResultPercentage(
      Math.floor(
        (result.questionResults.filter((answer) => !!answer.result).length /
          result.questionResults.length) *
          100,
      ),
    );
  }, [result]);

  const getAnsweredQuestionColor = (answer: QuestionResult) => {
    if (!answer.result) {
      return "";
    }
    return isRightAnswer(answer) ? "right-answer" : "wrong-answer";
  };

  const getProgressBarStyle = (width: number | null) => {
    let color: string;

    switch (true) {
      case !width || width <= 50:
        color = "red";
        break;
      case width && width <= 75:
        color = "yellow";
        break;
      case width && width <= 100:
        color = "lime";
        break;
      default:
        color = "red";
        break;
    }

    return {
      width: width ? `${width}%` : "0%",
      background: color,
    };
  };

  return (
    <div className="card test-info-card">
      {result && (
        <div>
          <p>{result.testName}</p>
          <div className={"progress"}>
            <p>{`${resultPercentage}%`}</p>
            <div className={"progress-bar"}>
              <div
                style={getProgressBarStyle(resultPercentage || null)}
                className={"progress-bar-inner"}
              ></div>
            </div>
          </div>
          {result.questionResults.map((answer, i) => (
            <li
              className={
                currentAnswer?.id === answer.id
                  ? "current-question"
                  : getAnsweredQuestionColor(answer)
              }
              key={answer.question.id}
            >
              <p>{`Вопрос №${i + 1}`}</p>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
