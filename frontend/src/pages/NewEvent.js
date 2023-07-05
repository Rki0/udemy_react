import React from "react";
import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

function NewEventPage() {
  return <EventForm method="post" />;
}

export default NewEventPage;

// loader가 렌더링 전 실행하는 함수라면
// action은 특정 동작을 위해 사용하는 함수(ex. form 제출)
// 얘도 react-router에 의해 실행되기 때문에, 객체를 받는다.
export async function action({ request, params }) {
  // form의 데이터를 추출해주는 기능이 있는데, 이를 활용하기 위해서는 name 프로퍼티가 input,textarea 등에 다 있는지 확인해주자. 이를 통해 데이터를 추출할 수 있다.
  const data = await request.formData();

  // get()을 통해 얻어온 데이터들에 접근해볼 수 있다.
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  // 사용자 입력값 검증
  // 이 프로젝트에서는 입력값 검증이 백엔드에서 걸러지면 422와 함께 에러가 반환되도록 설정했는데,
  // 이 때, response를 반환해서 이를 활용할 수 있다.
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  // react-router-dom에서 제공하는 메서드로, 인자로 넣어준 곳으로 이동한다.
  return redirect("/events");
}
