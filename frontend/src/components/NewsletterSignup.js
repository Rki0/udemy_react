import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  // 이 컴포넌트는 MainNavigation에 속해있는데, 문제는 action 함수는 Newletter 라우터에 정의되어 있다는 것이다.
  // 이렇게되면 모든 라우터에 action을 추가해줘야하는데..이를 피할 수 있는 방법이 있다! useFetcher!
  // 얘는 loader, action을 사용하면서 해당 함수가 속한 라우트를 로딩하지 않고 트리거하고 싶을 때 사용한다.
  // 따라서 공통 컴포넌트가 배후에서(라우트 전환 없이) 데이터만 업데이트하거나 받으려고 할 때 유용하게 사용할 수 있다.
  const fetcher = useFetcher();

  // fetcher에는 이러한 동작의 상태를 알 수 있는 메서드들이 많이 들어있다!
  const { data, state } = fetcher;

  useEffect(() => {
    // 더 이상 action이나 loader를 실행하지 않는 경우 === idle
    // data.message는 Newsletter에 있는 action이 data 객체에 message라는 key를 담아서 return 하기 때문이다.
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    // fetcher.Form은 여전히 Form처럼 action을 트리거하지만, 라우트 전환을 시작하지는 않는다.
    // 만약 Form을 사용했다면, "/events"에서 보이는 이 컴포넌트에 값을 입력하고 submit하는 경우 "/newsletter"로 강제 이동한다. 즉, 라우트 전환이 발생한다.
    // fetcher를 사용하는 경우는 action으로 인해 그 컴포넌트로 가지 않는 경우이다.
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
