import "src/components/test-content/test-content.component.scss";
import { TestInfoComponent } from "src/components/test-content/components/test-info/test-info.component";
import React, { useEffect } from "react";
import { $testStore } from "src/store/test.store";
import { useStore } from "effector-react";
import {
  $resultStore,
  addResult,
  setCurrentResultId,
} from "src/store/result.store";
import { v4 as uuid } from "uuid";
import { UserResult } from "src/models/user-result";
import { QuestionComponent } from "src/components/test-content/components/question/question.component";
import { getCurrentQuestionResult } from "src/utils/getCurrentQuestionResult";
import { useNavigate } from "react-router-dom";

export function TestContentComponent() {
  const testStore = useStore($testStore);
  const resultStore = useStore($resultStore);
  const navigate = useNavigate();

  // Хук срабатывает при инициализации компонента. Здесь проверяется:
  // если отсутствует текущий проходимый тест, то создается новый
  useEffect(() => {
    if (!testStore.test) {
      return;
    }

    const currentResult = resultStore.results.find(
      (result) => result.id === resultStore.currentResultId,
    );

    if (!currentResult) {
      const resultId = uuid();

      const result: UserResult = {
        id: resultId,
        testName: testStore.test.name,
        questionResults: testStore.test.questions.map((testQuestion) => ({
          id: uuid(),
          question: testQuestion,
          startDateTime: null,
          result: null,
        })),
        startDateTime: new Date(),
        endDateTime: null,
      };

      addResult(result);

      setCurrentResultId(resultId);

      return;
    }
  }, []);

  //Данный хук проверяет, был ли пройден тест до конца.
  //Если тест пройден - пользователь переводится на страницу результатов
  useEffect(() => {
    if (!resultStore.results.length) {
      return;
    }

    const currentResult = resultStore.results.find(
      (result) => result.id === resultStore.currentResultId,
    );

    if (currentResult?.endDateTime) {
      return;
    }

    if (!currentResult) {
      navigate("/results");
    }
  }, [resultStore]);

  return (
    <div className="container content-container">
      <div className="left">
        <TestInfoComponent
          result={
            resultStore.results.find(
              (result) => result.id === resultStore.currentResultId,
            ) || null
          }
        ></TestInfoComponent>
      </div>
      <div className="right">
        <QuestionComponent
          answer={getCurrentQuestionResult(
            resultStore.results.find(
              (result) => result.id === resultStore.currentResultId,
            )?.questionResults || [],
          )}
        ></QuestionComponent>
      </div>
    </div>
  );
}
