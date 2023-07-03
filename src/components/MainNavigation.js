import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              // style={({isActive}) => {...}} 이 방법도 가능.
              end // "/"로 시작하는 라우트가 많기 때문에 end 속성을 부여해서, 꼭 "/"로 될 때만 얘가 활성화되도록 한다.
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
