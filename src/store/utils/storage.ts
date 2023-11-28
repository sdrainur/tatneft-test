//Данные методы содержат дженерики для того, чтобы сохранялась одна логика сохранения
//данных в LocalStorage и могла быть применена для Store'ов разных интерфейсов

//Функция для сохранения состояния в LocalStorage
export const getSavedState = <T>(localStorageKey: string): T | null => {
  const user = localStorage.getItem(localStorageKey);
  if (!user) {
    return null;
  }
  return JSON.parse(user);
};

//Функция для получения сохраненного в LocalStorage состояния
export const saveState = <T>(payload: T | null, localStorageKey: string) => {
  localStorage.setItem(localStorageKey, JSON.stringify(payload));
};
