import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUserName, setEnteredUserName] = useState("");
  // const [enteredUserAge, setEnteredUserAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please Enter a valid name and age.",
      });

      return;
    }

    // +를 앞에 붙여서 number 타입으로 변경
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Input",
        message: "Please Enter a valid age(> 0).",
      });

      return;
    }

    props.onAddUser(enteredName, enteredAge);

    // setEnteredUserName("");
    // setEnteredUserAge("");
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // const userNameChangeHandler = (e) => {
  //   setEnteredUserName(e.target.value);
  // };

  // const userAgeChangeHandler = (e) => {
  //   setEnteredUserAge(e.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    // React.Fragment는 항상 작동하지만, shorthand는 항상 작동하지 않을 수 있음. 설정에 따라 다름
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.tile}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // onChange={userNameChangeHandler}
            // value={enteredUserName}
            ref={nameInputRef}
          />

          <label htmlFor="age">Age(Years)</label>
          <input
            type="number"
            id="age"
            // onChange={userAgeChangeHandler}
            // value={enteredUserAge}
            ref={ageInputRef}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
