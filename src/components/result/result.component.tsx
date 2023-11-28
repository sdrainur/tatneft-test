import "src/components/result/result.component.scss";
import { useStore } from "effector-react";
import { $resultStore } from "src/store/result.store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserResult } from "src/models/user-result";

export function ResultComponent() {
  const resultStore = useStore($resultStore);
  const navigate = useNavigate();

  //Хук проверяет, есть ли непройденный тест. Если есть - пользователь переводится на страницу тестирования
  useEffect(() => {
    if (
      !resultStore.results.length ||
      resultStore.results.some((result) => !result.endDateTime)
    ) {
      navigate("/test");
    }
  }, []);

  const getResultString = (result: UserResult) => {
    const rightAnswersCount = result.questionResults.filter(
      (result) => result.question.rightAnswerId === result.result?.userAnswerId,
    ).length;
    const answersCount = result.questionResults.length;

    return `Правильных ответов ${rightAnswersCount}/${answersCount}. Полученные баллы: ${Math.floor(
      (rightAnswersCount / answersCount) * 100,
    )}`;
  };

  return (
    <div className={"container"}>
      <div className={"card result-card"}>
        <p className={"card-title"}>Ваши баллы</p>
        <div className={"test-results"}>
          {resultStore.results
            .filter((result) => result.endDateTime)
            .map((result, i) => (
              <div key={i} className={"result-info"}>
                <p>{`Тест "${result.testName}"`}</p>
                {result.endDateTime && (
                  <p>{`Тест пройден ${new Date(
                    result.endDateTime,
                  ).toLocaleString()}`}</p>
                )}
                <p>{getResultString(result)}</p>
              </div>
            ))}
        </div>
        <div className={"result-actions"}>
          <button onClick={() => navigate("/test")}>Пройти тест заново</button>
        </div>
      </div>
    </div>
  );
}
