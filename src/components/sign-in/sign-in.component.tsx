import "src/components/sign-in/sign-in.component.scss";
import React, { useState } from "react";
import { setUser } from "src/store/user.store";
import { useStore } from "effector-react";
import { $testStore } from "src/store/test.store";

export function SignInComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const testStore = useStore($testStore);

  const handleSubmit = (e: React.FormEvent) => {
    setUser({
      firstName,
      lastName,
    });
    e.preventDefault();
  };

  return (
    <div className="sign-in-container">
      <div className="card">
        <p className="card-header mb-5">{testStore.test?.name}</p>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label className="text-field__label">Имя</label>
          <input
            className="text-field__input mb-5"
            type="text"
            required={true}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="text-field__label">Фамилия</label>
          <input
            className="text-field__input"
            type="text"
            required={true}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="form-action">
            <button className="submit-button" type="submit">
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
