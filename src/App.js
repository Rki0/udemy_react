// 배포 시 주의 할 것
// SPA는 index.html에서 모든 것이 발생하므로,
// 어떠한 요청에도 redirection을 index.html로 지정해줘야한다.
// 그렇지 않으면 라우터가 제대로 작동하지 않을 것이다.

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from "./pages/Home";
// import PostPage, { loader as postLoader } from "./pages/Post";
import RootLayout from "./pages/Root";
import { lazy, Suspense } from "react";

// lazy loading이 적용되었기 때문에 해당 페이지에 접근했을 때 자바스크립트 파일(컴포넌트의 코드)이 다운로드되는 것을 Network 탭에서 확인할 수 있다.
const BlogPage = lazy(() => import("./pages/Blog"));
const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          // loader에 lazy loading 적용하는 방법
          // import는 Promise를 반환하기 때문에 then, async/await 등을 사용할 수 있다.
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            // params를 넘겨줘야하는 경우 방법 1.
            // loader: ({ params }) =>
            //   import("./pages/Post").then((module) =>
            //     module.loader({ params })
            //   ),
            // params를 넘겨줘야하는 경우 방법 2.
            loader: (meta) =>
              import("./pages/Post").then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
