// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
// import NewEventPage, { action as newEventAction } from "./pages/NewEvent";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventRootLayout from "./pages/EventRoot";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <RootPage />,
  //   children: [
  //     { path: "/", element: <HomePage /> },
  //     { path: "/events", element: <EventsPage /> },
  //     { path: "/events/:eventId", element: <EventDetailPage /> },
  //     { path: "/events/new", element: <NewEventPage /> },
  //     { path: "/events/:eventId/edit", element: <EditEventPage /> },
  //   ],
  // },
  // 상대 경로
  // {
  //   path: "/",
  //   element: <RootPage />,
  //   children: [
  //     { index: true, element: <HomePage /> },
  //     {
  //       path: "events",
  //       element: <EventRootPage />,
  //       children: [
  //         { path: "", element: <EventsPage /> },
  //         { path: ":eventId", element: <EventDetailPage /> },
  //         { path: "new", element: <NewEventPage /> },
  //         { path: ":eventId/edit", element: <EditEventPage /> },
  //       ],
  //     },
  //   ],
  // },
  // // nested router 1(nested만 상대 경로)
  // {
  //   path: "/",
  //   element: <RootLayout />,
  //   children: [
  //     // { path: "/", element: <HomePage /> },
  //     { index: true, element: <HomePage /> },
  //     {
  //       path: "/events",
  //       element: <EventRootLayout />,
  //       children: [
  //         { path: "", element: <EventsPage /> },
  //         { path: ":eventId", element: <EventDetailPage /> },
  //         { path: "new", element: <NewEventPage /> },
  //         { path: ":eventId/edit", element: <EditEventPage /> },
  //       ],
  //     },
  //   ],
  // },
  // nested router 2(전부 상대 경로)
  {
    path: "/",
    element: <RootLayout />,
    // 얘는 꼭 url 경로 에러만 처리하는게 아니다. 그건 그냥 활용 예시일 뿐. loader의 에러 등도 처리할 수 있다.
    // 하위 라우터에서 발생한 에러 또한 버블링되서 올라오므로 처리할 수 있다. 물론, 여기 errorElement가 가장 가까운 에러 요소인 경우에.
    // React가 가장 근접한 에러 요소를 보여주기 때문에 활용할 수 있다.
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventRootLayout />,
        children: [
          // loader 속성을 사용해서 해당 라우터 접근 직전에 실행할 함수를 작성할 수 있다! element에 있는 컴포넌트로 return 값을 넘길 수도 있다.
          // 즉, 렌더링이 되기 전에 호출된다는 뜻!!!!
          // 또한, loader가 작업을 완료할 때까지 라우터가 대기한다!! 백엔드에서 loader가 완료되기 위한 데이터를 1500ms 후에 준다고 강제한다면
          // 1500ms 동안 페이지 렌더링이 되지 않고, loader 완료를 대기한다.
          // 따라서, 로딩 상태를 표시하거나 할 필요는 없지만, 유저 입장에서는 대기 시간이 길어지고, 아무런 일도 발생하지 않는 것처럼 보인다는 단점이 있다.
          // Promise를 알아서 resolve 해주기 때문에 return이 Promise더라도 사용하는 컴포넌트 쪽에서 처리해주지 않아도 된다.
          // 코드를 깔끔하게 하기 위해서 해당 컴포넌트 페이지에서 loader를 담당할 함수를 만들어놓고 import해서 사용하면 된다. 물론, 코드를 어디에 놓을지는 본인의 선택이다.
          {
            path: "",
            element: <EventsPage />,
            loader: eventsLoader,
            // errorElement : <ErrorPage /> // 여기에 errorElement를 사용하면 EventsPage의 에러는 여기서 보여질 것.
          },
          {
            path: ":eventId",
            // 부모 라우터의 데이터를 사용하기 위해 id를 추가해야한다.
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
