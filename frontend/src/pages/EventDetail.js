import React, { Suspense } from "react";
import {
  useParams,
  json,
  useLoaderData,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

// function EventDetailPage() {
//   // const data = useLoaderData();
//   const data = useRouteLoaderData("event-detail");

//   return (
//       <EventItem event={data.event} />
//   );
// }

// 여러 개의 http 통신이 있는 경우의 defer
function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loaedeEvents) => <EventsList events={loaedeEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    // loader와 loadEvents 사이에 defer가 있기 때문에 직접 파싱해줘야한다.
    const resData = await response.json();
    return resData.events;
  }
}

// 여러 개의 http 액션이 있는 경우
export async function loader({ request, params }) {
  const id = params.eventId;

  // 현재 defer는 세부정보와 리스트 정보를 모두 defer하고 있기 때문에 상세 페이지에 들어가서 두 통신을 모두 기다리는 문제가 있다. 이는 UX 상 좋지 않을 것.
  // 그래서 따로 따로 구분해서 defer시킬 수 있다. 먼저 보여주고 싶은 것에 await를 걸면된다.
  // loader기 때문에 event를 기다렸다가, 페이지가 넘어가고, 페이지가 로딩된 후에 events가 실행될 것이다.
  // 이러면 최소 event에 대해서는 loading 문구가 안 보이게 될 것이다.
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

// 특정 id의 데이터의 상세 정보를 받아오는 loader 구현
// 문제는...hooks(useParams)를 사용할 수 없기 때문에 id를 얻을 수 없다!
// 그런데! loader에서 라우트 파라미터에 접근할 수 있는 방법이 있다! loader 함수를 실행할 때 객체를 하나 주는데 그걸 활용한다.
// export async function loader({ request, params }) {
//   const id = params.eventId;

//   const response = await fetch("http://localhost:8080/events/" + id);

//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch details for selected event." },
//       { status: 500 }
//     );
//   } else {
//     return response;
//   }
// }

export async function action({ request, params }) {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    // method: "DELETE",
    method: request.method, // 이 방법을 통해 전송하려는 method가 라우터에서 생성한 요청과 같다고 표시할 수 있다. EventItem에서 delete method를 사용하겠다고 했으므로 delete가 된다.
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }

  return redirect("/events");
}
