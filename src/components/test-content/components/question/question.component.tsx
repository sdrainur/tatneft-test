import "src/index.scss";
import "src/components/test-content/components/question/question.component.scss";
import { QuestionResult } from "src/models/question-result";
import { useEffect, useState } from "react";
import { addUserAnswer } from "src/store/result.store";

export function QuestionComponent({
  answer,
}: {
  answer: QuestionResult | null;
}) {
  //State, хранящий выбранный пользователем ответ
  const [answerId, setAnswerId] = useState<string>();

  //State, хранящий текущий вопрос
  const [currentQuestion, setCurrentQuestion] = useState<QuestionResult>();

  //Эффект, перемешивающий ответы на вопрос
  useEffect(() => {
    if (!answer) {
      return;
    }
    setCurrentQuestion({
      ...answer,
      question: {
        ...answer.question,
        answers: answer.question.answers.sort(() => Math.random() - 0.5),
      },
      startDateTime: new Date().toISOString(),
    });
  }, [answer]);

  const answerQuestion = (currentAnswer: QuestionResult) => {
    if (!answerId) {
      return;
    }
    addUserAnswer({
      id: currentAnswer.id,
      question: currentAnswer.question,
      startDateTime: currentAnswer.startDateTime,
      result: {
        userAnswerId: answerId,
        endDateTime: new Date().toISOString(),
      },
    });

    setAnswerId(undefined);
  };

  return (
    <div className="card question-card">
      {currentQuestion && (
        <div>
          <p className="question-text">{currentQuestion.question.text}</p>
          <form>
            {currentQuestion.question.answers.map((answer, i) => (
              <div key={i} className={"question-answer"}>
                <input
                  type="radio"
                  id={i.toString()}
                  name="answer"
                  checked={answerId === answer.id}
                  onChange={() => setAnswerId(answer.id)}
                />
                <label htmlFor={i.toString()}>
                  <p>{answer.text}</p>
                </label>
              </div>
            ))}
            <button
              type="submit"
              disabled={!answerId}
              onClick={(e) => {
                answerQuestion(currentQuestion);
                e.preventDefault();
              }}
            >
              Продолжить
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
