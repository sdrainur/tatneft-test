import { Test } from "src/models/test";
import { createEvent, createStore } from "effector";
import { getSavedState, saveState } from "src/store/utils/storage";

const localStorageKey = "test-store";

//Данный стор хранит в себе тест, полученный из JSON файла

interface TestState {
  test: Test | null;
}

const emptyTestState: TestState = {
  test: null,
};

export const saveTests = createEvent<Test>();

//Определение стора с учетом сохраненного состояния в LocalStorage. Если такового нет - применятся значения по умолчанию
const defineStore = () => {
  const savedState = getSavedState<TestState>(localStorageKey);

  const $store = createStore<TestState>(savedState || emptyTestState).on(
    saveTests,
    (state, test) => ({
      ...state,
      test,
      selectedTestId: null,
      selectedQuestionId: null,
    }),
  );
  $store.watch((state) => saveState<TestState>(state, localStorageKey));

  return $store;
};

export const $testStore = defineStore();
