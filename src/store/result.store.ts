import { UserResult } from "src/models/user-result";
import { createEvent, createStore } from "effector";
import { QuestionResult } from "src/models/question-result";
import { getSavedState, saveState } from "src/store/utils/storage";
import { resetUser } from "src/store/user.store";

//Данный стор хранит в себе данные о пройденных тестах и ответах на вопросы

const localStorageKey = "result-store";

interface ResultState {
  results: UserResult[];
  currentResultId: string | null;
}

const emptyResultState: ResultState = {
  results: [],
  currentResultId: null,
};

export const addResult = createEvent<UserResult>();

export const addUserAnswer = createEvent<QuestionResult>();

export const setCurrentResultId = createEvent<string | null>();

//Определение стора с учетом сохраненного состояния в LocalStorage. Если такового нет - применятся значения по умолчанию
const defineStore = () => {
  const savedState = getSavedState<ResultState>(localStorageKey);

  const $store = createStore<ResultState>(savedState || emptyResultState)
    .on(addResult, (state, userResult) => ({
      ...state,
      results: [...state.results, userResult],
    }))
    .on(setCurrentResultId, (state, currentResultId) => ({
      ...state,
      currentResultId,
    }))
    .on(addUserAnswer, (state, userAnswer) => {
      let lastAnswer = false;

      return {
        results: state.results.map((result) => {
          if (result.id !== state.currentResultId) {
            return result;
          }

          return {
            ...result,
            questionResults: result.questionResults.map((answer, id) => {
              if (answer.question.id !== userAnswer.question.id) {
                return answer;
              }

              if (id === result.questionResults.length - 1) {
                lastAnswer = true;
              }

              return userAnswer;
            }),
            endDateTime: lastAnswer ? new Date() : null,
          };
        }),
        currentResultId: lastAnswer ? null : state.currentResultId,
      };
    })
    //Возврат состояния стора к исходному состоянию, который срабатывает при удалении пользователя
    .on(resetUser, () => emptyResultState);

  $store.watch((state) => saveState<ResultState>(state, localStorageKey));

  return $store;
};

export const $resultStore = defineStore();
