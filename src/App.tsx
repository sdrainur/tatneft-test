import React, { useEffect } from "react";
import "./App.css";
import { HeaderComponent } from "src/components/header/header.component";
import { TestContentComponent } from "src/components/test-content/test-content.component";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignInComponent } from "src/components/sign-in/sign-in.component";
import { useStore } from "effector-react";
import { $userStore } from "src/store/user.store";
import test from "src/assets/tests/test.json";
import { Test } from "src/models/test";
import { saveTests } from "src/store/test.store";
import { ResultComponent } from "src/components/result/result.component";

function App() {
  const userStore = useStore($userStore);

  useEffect(() => {
    saveTests(test as unknown as Test);
  }, []);

  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !userStore.user ? <SignInComponent /> : <Navigate to={"test"} />
            }
          ></Route>
          <Route
            path="/test"
            element={
              userStore.user ? <TestContentComponent /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/results"
            element={
              userStore.user ? <ResultComponent /> : <Navigate to={"/"} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
