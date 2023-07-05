// import React from "react";
// import { Outlet } from "react-router-dom";

// import MainNavigation from "../components/MainNavigation";

// function RootLayout() {
//   return (
//     <div>
//       <MainNavigation />

//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default RootLayout;

import React from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  // 상위 컴포넌트가 하위 컴포넌트의 loader에 접근하려고 하면 undefined만 나온다. 반대의 경우에는 잘 된다.
  // const events = useLoaderData();
  // console.log(events);

  // useNavigation을 통해 현재 전환이 진행 중인지 아닌지 확인할 수 있다. loader의 진행 상황을 확인해보자. navigation.state
  const navigation = useNavigation();

  return (
    <div>
      <MainNavigation />

      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
