// import React from "react";
// import { Link } from "react-router-dom";

// const EVENTS = [
//   {
//     id: "e1",
//     title: "event1",
//   },
//   {
//     id: "e2",
//     title: "event2",
//   },
//   {
//     id: "e3",
//     title: "event3",
//   },
// ];

// function EventsPage() {
//   return (
//     <>
//       <h1>EventsPage</h1>

//       <ul>
//         {EVENTS.map((event) => (
//           <li key={event.id}>
//             {/* 절대 경로 */}
//             {/* <Link to={`/events/${event.id}`}>{event.title}</Link> */}
//             {/* 상대 경로 */}
//             <Link to={event.id}>{event.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default EventsPage;

import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

// loader 사용하는 코드
// function EventsPage() {
//   // 가장 가까운 loader 데이터에 접근할 수 있다.
//   const data = useLoaderData();

//   // if (data.isError) {
//   //   return <p>{data.message}</p>;
//   // }

//   const events = data.events;

//   return <EventsList events={events} />;
// }

// defer 사용하는 코드
function EventsPage() {
  // 하단의 defer에 저장된 객체에 접근할 수 있다.
  const { events } = useLoaderData();

  // Await 컴포넌트는 events에 데이터가 올 때가지 기다린다.
  // 여닫는 태그 사이에서 동적으로 출력한다.
  // 이 때 Suspense로 감싸서 대기 중 보여줄 fallback을 지정한다.
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {/* 이 함수는 데이터가 도착하면 호출될 것이다. */}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// defer()와 함께 사용하기 위해 loader에 있던 것을 다른 함수로 만들었다.
//
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

export function loader() {
  // 이 페이지에서 발생할 수 있는 모든 http 통신을 넣어줘야한다.
  // key에 저장되는 것은 Promise여야한다. 왜? defer가 resolve를 판단하기 위한, Promise를 다루기 위한 메서드이므로.
  // defer는 여러 개의 Http 통신이 있거나, 다른 UI는 보여주면서 특정 UI만 로딩 상태를 보여주고 싶을 떄 유용하게 사용할 수 있다.
  return defer({
    events: loadEvents(),
  });
}

// // 착각하지말자. loader는 서버가 아니라 브라우저에서 실행되는 클라이언트 코드이다. 즉, 브라우저 API를 전부 사용할 수 있다. 대신 react hooks는 사용 불가.
// export async function loader() {
//   const response = await fetch("http://localhost:8080/events");

//   if (!response.ok) {
//     // 여기서 던져지는 에러는 가장 근접한 에러 핸들링 요소로 넘어간다. 라우터의 errorElement.
//     // 에러 핸들링 방법 1.
//     // return {
//     //   isError: true,
//     //   message: "Could not fetch events.",
//     // };
//     // 에러 핸들링 방법 2.
//     // throw { message: "Could not fetch events." };
//     // 에러 핸들링 방법 3.
//     // 추가적인 필드(ex. status)를 만들 수 있기 때문에 일반 객체보다 Response를 사용하는 것이 좋을 것 같다.
//     // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
//     //   status: 500,
//     // });
//     // 에러 핸들링 방법 4.
//     // react-router-dom의 json 메서드 사용하기. 얘도 Response를 반환한다.
//     // 수동으로 json 변환을 해줄 필요가 없다. 또한 Response 메타 데이터 설정도 가능하다.
//     throw json({ message: "Could not fetch events." }, { status: 500 });
//   } else {
//     // const resData = await response.json();
//     // return resData.events;
//     // 클라이언트 코드에서도 res를 생성할 수 있다.
//     // 왜 이 방법을 굳이 써요? 그냥 바로 리턴하면 되잖아요!
//     // 그 이유는 주로 fetch와 loader를 함께 쓰기 때문이다. fetch는 Promise를 반환하고, loader는 이를 자동으로 resolve한다.
//     // 그래서 일일이 파싱할 필요없이(ex. json()) 그냥 바로 Response를 return하는 방법을 사용할 수도 있는 것이다. fetch는 Promise<Response>를 반환한다.
//     // const res = new Response("any data", { status: 201 });
//     // return res;
//     return response; // 이러면 useLoaderData()를 사용하는 곳에서는 resolve된 데이터를 받게 되므로, 더 코드를 줄일 수 있겠다.
//   }
// }
