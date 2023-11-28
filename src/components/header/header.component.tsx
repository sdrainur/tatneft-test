import React from "react";
import "src/index.scss";
import "src/components/header/header.component.scss";
import { useStore } from "effector-react";
import { $userStore, resetUser } from "src/store/user.store";

export function HeaderComponent() {
  const userStore = useStore($userStore);

  return (
    <header>
      <div className="header">
        <div className="container header-inner">
          <div className={"header-left"}>
            <p className="header-title">ТЕСТИРОВАНИЕ</p>
          </div>
          {!!userStore.user && (
            <div className="user-info">
              <p className="header-user">
                {`${userStore.user.firstName} ${userStore.user.lastName}`}
              </p>
              <button className="exit-button" onClick={() => resetUser()}>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889"
                    stroke="#464455"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
