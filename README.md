# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Пояснительная записка

В написанном приложении создается 3 Effector store:

-   resultStore (необходим для хранения результатов и отслежтивания прогресса прохождения теста)
-   testStore (необходим при инициализации и сохранения теста из JSON)
-   userStore (необходим для хранения данных о пользователе)

Используется SCSS, чтобы была возможность импортирования переменных и применения их в классах разных компонент

Модели, используемые в коде, хранятся в папке "models"

Папка "utils" содержит методы, логика которых используется в нескольких местах (для
того, чтобы при изменении данный логики, изменения применились везде)

Папка "components" разбивается на подпапки, отвечающие за каждый отдельно взятый компонент
и хранящий в себе ".tsx" и ".scss" файлы. Стили, определенные в таких ".scss" файлах
применяются только в рамках текущего компонента

Тест в формате JSON хранится в "src/assets/tests/test.json"

Выполненные дополнительные задачи:

-   Подсветка правильных и неправильных ответов при прохождении теста
-   Случайные позиции для правильного ответа при каждом новом прохождении

При перезагрузке страницы пользователь остается на прежнем вопросе

В рамках одной страницы все действия происходят без перезагрузки

В качестве менеджера состояния используется Effector
