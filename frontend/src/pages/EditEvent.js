import React from "react";
import EventFrom from "../components/EventForm";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";

function EditEventPage() {
  // EventDetailPage의 데이터를 편집하는 것이기 때문에, 그 곳의 데이터를 가져와야한다.
  // 그렇다면 loader를 또 한번 반복 작성해야하는걸까? 아니다!
  // 중첩 라우터를 사용해서 ":eventId"를 공통 부모로 만들고, 공통 loader를 사용하면 된다.
  // const data = useLoaderData();
  // useLoaderData와 비슷하게 동작하지만 router의 id를 인자로 받는다.
  const data = useRouteLoaderData("event-detail");

  return <EventFrom event={data.event} method="patch" />;
}

export default EditEventPage;
