import React from "react";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  // 라우트에서 발생하는(던져지는) 에러를 받아올 수 있다.
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    // Response로 던진 에러에서 JSON.stringify로 만들어서 주기 때문에 error.data로 접근함. 물론 파싱도 해주고.
    // message = JSON.parse(error.data).message;
    // json() 메서드를 사용해서 던졌다면 parse를 할 필요가 없다. react-router-dom이 대신 파싱해주기 때문.
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      {/* 에러가 발생했을 때, 다른 페이지로 나갈 수 있게하는 용도로 navbar를 보여준다. */}
      <MainNavigation />

      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
