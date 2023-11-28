import { User } from "src/models/user";
import { createEvent, createStore } from "effector";
import { getSavedState, saveState } from "src/store/utils/storage";

const localStorageKey = "user-store";

interface UserState {
  user: User | null;
}

export const emptyUserState: UserState = {
  user: null,
};

export const setUser = createEvent<User>();

export const resetUser = createEvent();

//Определение стора с учетом сохраненного состояния в LocalStorage. Если такового нет - применятся значения по умолчанию
const defineStore = () => {
  const savedState = getSavedState<UserState>(localStorageKey);

  const $store = createStore<UserState>(savedState || emptyUserState)
    .on(setUser, (state, newUser) => {
      return { ...state, user: newUser };
    })
    //Возврат стора к исходному состоянию
    .on(resetUser, () => {
      saveState<UserState>(null, localStorageKey);
      return emptyUserState;
    });

  $store.watch((state) => saveState<UserState>(state, localStorageKey));

  return $store;
};

export const $userStore = defineStore();
