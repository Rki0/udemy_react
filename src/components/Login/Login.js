import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

// 컴포넌트 내에서 생성되는 데이터를 사용하지 않기 때문에 함수 밖으로 꺼내서 관리할 수 있다.
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  // blur 될 때, 입력값을 잃으면 안되니까, value에 state 사용
  // state는 최신 데이터를 보여줌.
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {
  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // 다른 state를 기반으로 state를 업데이트하는 상황이 많다면 useReducer로 전환을 고려해보자.
  // state의 최신성을 보장하기 위해

  // // useEffect는 렌더링 주기 후에 실행된다.
  // // dependency에 빈 배열 조차 넣지 않는다면 state 변경마다 매번 실행된다.
  // useEffect(() => {
  //   console.log("effect running");

  //   return () => {
  //     console.log("clean running");
  //   };
  // }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // 타이핑 할 때마다 유효성 검사하면 리소스 낭비가 될 수도 있다..
    // 디바운싱!
    // 타이머를 저장하는데, 다음에 키가 입력되면 그걸 지운다. 그럼 결국에는 마지막 타이머만 실행되겠지!!
    const identifier = setTimeout(() => {
      console.log("check");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    // 클린업 함수
    // useEffect가 위 함수를 실행하기 전에 클린업하는 역할
    // 즉, useEffect 내부의 사이드 이펙트 함수들이 실행되기 전에, 컴포넌트가 언마운트(제거)되기 전에 실행된다.
    // 첫음 사이드 이펙트 함수가 실행되기 전에는 실행되지 않는다.
    return () => {
      console.log("clean up");
      clearTimeout(identifier);
    };

    // 아래의 dependency의 경우 상태 변경을 계속 파악하기 때문에, 이미 유효한 값에서 값을 변경해서 유효성을 유지하더라도 실행된다는 문제가 있음.
    // }, [emailState, passwordState]);
    // 그래서 reducer에서 destructuring해서 valid 여부만 파악하도록 변경
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // 현재 input이 blur 될 때 validate를 진행하므로 action type을 이런 식으로 명명한 것.
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }

    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          ref={emailInputRef}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          ref={passwordInputRef}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
