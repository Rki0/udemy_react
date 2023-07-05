import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";

function RootLayout() {
  // const navigation = useNavigation();

  const token = useLoaderData(); // 여기서는 token을 얻을 때 useRouteLoaderData()를 안 쓰는 이유? 이 라우터의 loader에 해당하는 함수로부터 정보를 얻는 것이기 때문.
  const submit = useSubmit(); // MainNavigation에 있는 logout Form을 submit하기 위해

  // 자동 로그아웃
  useEffect(() => {
    if (!token) {
      return;
    }

    // 토큰 만료 시 처리 로직
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    // setTimeout을 통해 토큰이 1시간이 지나면 로그아웃이 되도록 할건데, 만약, 앱을 새로 불러오기라도하면 다시 실행되기 때문에 의미가 없음.
    // 따라서, 별도로 만료 시간을 저장해놓고, 잔여 시간(tokenDuration)을 계산해서 setTimeout을 다시 돌림. 이러면 유동적으로 만료 시간을 업데이트해서 사용할 수 있음.
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
