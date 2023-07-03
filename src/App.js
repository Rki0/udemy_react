import {
  createBrowserRouter,
  RouterProvider,
  // createRoutesFromElements,
  // Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

// 방법 1.
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );

// const router = createBrowserRouter(routeDefinitions);

// 방법 2.
// const router = createBrowserRouter([
//   { path: "/", element: <HomePage /> },
//   { path: "/products", element: <ProductsPage /> },
// ]);

// 방법 2. nested route. children은 Outlet 컴포넌트를 통해 보여줄 수 있다.
// "/"로 시작하면 절대 경로이다. 항상 도메인 이름 뒤에서 시작한다는 것이다.
const router = createBrowserRouter([
  // 절대 경로 버전
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, // 에러 페이지 정의
    children: [
      // { path: "/", element: <HomePage /> },
      // 인덱스 라우트를 사용해서, 위 코드와 동일한 효과를 만들 수도 있다. 부모 라우트가 활성중일 때 활성되어야할 기본 라우트를 알려주는 것이다.
      { index: true, element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:productId", element: <ProductDetailPage /> },
    ],
  },
  // // 상대 경로로 표현할 수도 있음.
  // {
  //   path: "/",
  //   element: <RootLayout />,
  //   errorElement: <ErrorPage />, // 에러 페이지 정의
  //   children: [
  //     { path: "", element: <HomePage /> },
  //     { path: "products", element: <ProductsPage /> },
  //     { path: "products/:productId", element: <ProductDetailPage /> },
  //   ],
  // },
  // // 루트 경로를 "/root"로 하고, 나머지는 "/"없이 시작한다고 했을 때, 그들은 상대 경로가 된다. 즉, 루트 라우트 경로 뒤에 첨부된다는 걸 의미한다.
  // {
  //   path: "/root",
  //   element: <RootLayout />,
  //   errorElement: <ErrorPage />, // /root로 시작하는 경로에 대한 에러를 보여주기 때문에 /root로 시작하지 않는 경로에 대해서는 작동하지 않는다.
  //   children: [
  //     { path: "", element: <HomePage /> },
  //     { path: "products", element: <ProductsPage /> },
  //     { path: "products/:productId", element: <ProductDetailPage /> },
  //   ],
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
