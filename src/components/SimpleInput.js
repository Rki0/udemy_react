import useInput from "../hooks/useInput";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  // state 변경 시, 컴포넌트가 재평가되므로, 이 부분은 최신 상태를 유지한다. 따라서 별도의 state로 관리하지 않아도 된댜.
  // 따라서, 동일한 검증 로직을 사용하는 handler에서도 state를 제거한다.
  // const enteredNameIsValid = enteredName.trim() !== "";

  // 한번 이상 터치되었으면서, 유효하지 않은 값이라면 그 땐 진짜 유효하지 않은 것.
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    // form이 제출될 때 한번만 값이 필요하다면 ref가 낫고
    // 입력될 때마다 값이 필요하다면 state가 낫다. 입력값을 초기화하고 싶은 경우에도 state가 더 좋다. ref로 DOM을 직접 조작하는 것은 바람직하지 않기 때문.
    // const enteredValue = nameInputRef.current.value;

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />

        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />

        {emailInputHasError && (
          <p className="error-text">Email must not be empty.</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
